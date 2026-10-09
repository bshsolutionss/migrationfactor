import '../src/config/environment.mjs';
import {securityHeaders as security} from '../src/config/http.mjs';

export default async function handler(req, res) {
 for (const [key, value] of Object.entries(security)) {
  res.setHeader(key, value);
 }
 res.setHeader('Content-Type', 'application/json; charset=utf-8');
 res.setHeader('Cache-Control', 'no-store');

 if (req.method !== 'GET') {
  res.setHeader('Allow', 'GET');
  if (typeof res.status === 'function') {
   return res.status(405).json({message: 'Method not allowed.'});
  }
  res.writeHead(405);
  return res.end(JSON.stringify({message: 'Method not allowed.'}));
 }

 const webhook = process.env.ENQUIRY_WEBHOOK_URL || '';
 const data = {deliveryConfigured: Boolean(webhook)};

 if (typeof res.status === 'function') {
  return res.status(200).json(data);
 }
 res.writeHead(200);
 return res.end(JSON.stringify(data));
}
