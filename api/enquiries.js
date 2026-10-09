import '../src/config/environment.mjs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {validateEnquiry} from '../src/services/enquiries.mjs';
import {saveEnquiry} from '../src/services/storage.mjs';
import {forwardEnquiry} from '../src/services/delivery.mjs';
import {securityHeaders as security} from '../src/config/http.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const limits = new Map();

export default async function handler(req, res) {
 for (const [key, value] of Object.entries(security)) {
  res.setHeader(key, value);
 }

 const json = (status, data) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (typeof res.status === 'function') {
   return res.status(status).json(data);
  }
  res.writeHead(status);
  return res.end(JSON.stringify(data));
 };

 try {
  if (req.method !== 'POST') {
   res.setHeader('Allow', 'POST');
   return json(405, {message: 'Use POST to submit an enquiry.'});
  }

  const contentType = req.headers['content-type'] || '';
  if (!/^application\/json(?:;|$)/i.test(contentType)) {
   return json(415, {message: 'JSON content is required.'});
  }

  if (req.headers.origin) {
   let originHost;
   try {
    originHost = new URL(req.headers.origin).host;
   } catch {}
   const expectedHost = req.headers['x-forwarded-host'] || req.headers.host;
   if (originHost && expectedHost && originHost !== expectedHost) {
    return json(403, {message: 'Submit the form from this website.'});
   }
  }

  const now = Date.now();
  for (const [key, value] of limits) {
   if (now - value.start > 600000) limits.delete(key);
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || req.socket?.remoteAddress || 'local';
  const bucket = limits.get(ip) || {start: now, count: 0};
  bucket.count++;
  limits.set(ip, bucket);

  const rateLimit = 8;
  if (bucket.count > rateLimit) {
   res.setHeader('Retry-After', Math.ceil((600000 - now + bucket.start) / 1000));
   return json(429, {message: 'Too many attempts. Please wait a few minutes or email info@migrationfactor.com.'});
  }

  let input;
  try {
   if (req.body && typeof req.body === 'object') {
    input = req.body;
   } else if (typeof req.body === 'string') {
    if (req.body.length > 16384) {
     return json(413, {message: 'Your enquiry is too large. Please use fewer characters.'});
    }
    input = JSON.parse(req.body);
   } else {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
     size += chunk.length;
     if (size > 16384) return json(413, {message: 'Your enquiry is too large. Please use fewer characters.'});
     chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString('utf8');
    input = JSON.parse(raw);
   }
  } catch {
   return json(400, {message: 'Invalid request. Please try again.'});
  }

  const {data, errors} = validateEnquiry(input);
  if (Object.keys(errors).length) {
   return json(422, {message: 'Please check the highlighted fields.', errors});
  }

  const {website, ...fields} = data;
  const record = {id: randomUUID(), createdAt: new Date().toISOString(), ...fields};

  const dataDir = process.env.DATA_DIR || (process.env.VERCEL ? path.join(os.tmpdir(), 'migrationfactor-data') : path.join(root, 'data'));
  await saveEnquiry(dataDir, record);

  const webhook = process.env.ENQUIRY_WEBHOOK_URL || '';
  const token = process.env.ENQUIRY_WEBHOOK_TOKEN || '';
  const delivered = await forwardEnquiry(record, webhook, token);

  return json(201, {
   id: record.id,
   delivery: delivered ? 'forwarded' : 'local',
   message: delivered
    ? `Your enquiry has been saved and forwarded to the enquiry service. Reference: ${record.id.slice(0, 8)}.`
    : webhook
      ? `Your enquiry was saved, but forwarding failed. Please contact info@migrationfactor.com. Reference: ${record.id.slice(0, 8)}.`
      : `Your enquiry has been saved on this server. It has not been emailed to Migration Factor. Reference: ${record.id.slice(0, 8)}. For a direct response, email info@migrationfactor.com.`
  });
 } catch (error) {
  console.error('API request failed:', error.code || error.name || error);
  return json(500, {message: 'The server could not complete your request. Please email info@migrationfactor.com.'});
 }
}
