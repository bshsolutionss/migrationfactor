import http from 'node:http';
import './src/config/environment.mjs';
import {networkInterfaces} from 'node:os';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID,createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {validateEnquiry} from './src/services/enquiries.mjs';
import {saveEnquiry} from './src/services/storage.mjs';
import {forwardEnquiry} from './src/services/delivery.mjs';
import {mimeTypes as types,securityHeaders as security} from './src/config/http.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
export function createApp({dataDir=path.join(root,'data'),webhook=process.env.ENQUIRY_WEBHOOK_URL||'',token=process.env.ENQUIRY_WEBHOOK_TOKEN||'',rateLimit=8}={}){
 const limits=new Map();const cache=new Map();
 const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
 return http.createServer(async(req,res)=>{
  for(const [key,value] of Object.entries(security))res.setHeader(key,value);
  try{
   const url=new URL(req.url,'http://localhost');
   if(url.pathname==='/api/config'&&req.method==='GET')return json(res,200,{deliveryConfigured:Boolean(webhook)});
   if(url.pathname==='/api/enquiries'){
    if(req.method!=='POST'){res.setHeader('Allow','POST');return json(res,405,{message:'Use POST to submit an enquiry.'})}
    if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))return json(res,415,{message:'JSON content is required.'});
    if(req.headers.origin){let originHost;try{originHost=new URL(req.headers.origin).host}catch{}if(originHost!==req.headers.host)return json(res,403,{message:'Submit the form from this website.'})}
    const now=Date.now();for(const [key,value] of limits)if(now-value.start>600000)limits.delete(key);
    const ip=req.socket.remoteAddress||'local';const bucket=limits.get(ip)||{start:now,count:0};bucket.count++;limits.set(ip,bucket);
    if(bucket.count>rateLimit){res.setHeader('Retry-After',Math.ceil((600000-now+bucket.start)/1000));return json(res,429,{message:'Too many attempts. Please wait a few minutes or email info@migrationfactor.com.'})}
    const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>16384)return json(res,413,{message:'Your enquiry is too large. Please use fewer characters.'});chunks.push(chunk)}const raw=Buffer.concat(chunks).toString('utf8');
    let input;try{input=JSON.parse(raw)}catch{return json(res,400,{message:'Invalid request. Please try again.'})}
    const {data,errors}=validateEnquiry(input);if(Object.keys(errors).length)return json(res,422,{message:'Please check the highlighted fields.',errors});
    const {website,...fields}=data;const record={id:randomUUID(),createdAt:new Date().toISOString(),...fields};
    await saveEnquiry(dataDir,record);
    const delivered=await forwardEnquiry(record,webhook,token);
    return json(res,201,{id:record.id,delivery:delivered?'forwarded':'local',message:delivered?`Your enquiry has been saved and forwarded to the enquiry service. Reference: ${record.id.slice(0,8)}.`:webhook?`Your enquiry was saved, but forwarding failed. Please contact info@migrationfactor.com. Reference: ${record.id.slice(0,8)}.`:`Your enquiry has been saved on this local server. It has not been emailed to Migration Factor. Reference: ${record.id.slice(0,8)}. For a direct response, email info@migrationfactor.com.`});
   }
   if(url.pathname.startsWith('/api/'))return json(res,404,{message:'Not found.'});
   if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');return json(res,405,{message:'Method not allowed.'})}
   let requested;try{requested=decodeURIComponent(url.pathname)}catch{return json(res,400,{message:'Invalid URL.'})}
   if(requested.includes('\\')||requested.includes('\0'))return json(res,400,{message:'Invalid URL.'});
   const dist=path.join(root,'dist');let target=path.resolve(dist,'.'+requested);if(target!==dist&&!target.startsWith(dist+path.sep))return json(res,403,{message:'Access denied.'});
   let status=200;try{if((await stat(target)).isDirectory()){if(!requested.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search});return res.end()}target=path.join(target,'index.html')}await stat(target)}catch{target=path.join(dist,'404','index.html');status=404}
   const meta=await stat(target);let entry=cache.get(target);if(!entry||entry.modified!==meta.mtimeMs){const body=await readFile(target);entry={modified:meta.mtimeMs,body,gzip:gzipSync(body),etag:'"'+createHash('sha256').update(body).digest('hex').slice(0,20)+'"'};cache.set(target,entry)}
   const type=types[path.extname(target)]||'application/octet-stream';res.setHeader('Content-Type',type);res.setHeader('Cache-Control',type.startsWith('text/html')?'no-cache':/^[a-f0-9]{12}$/.test(url.searchParams.get('v')||'')?'public, max-age=31536000, immutable':'public, max-age=3600');res.setHeader('ETag',entry.etag);res.setHeader('Vary','Accept-Encoding');
   if(req.headers['if-none-match']===entry.etag&&status===200){res.writeHead(304);return res.end()}
   const gzip=/\bgzip\b/.test(req.headers['accept-encoding']||'')&&!['.webp','.woff2'].includes(path.extname(target));if(gzip)res.setHeader('Content-Encoding','gzip');const body=gzip?entry.gzip:entry.body;res.setHeader('Content-Length',body.length);res.writeHead(status);res.end(req.method==='HEAD'?undefined:body);
  }catch(error){console.error('Request failed:',error.code||error.name);if(!res.headersSent)json(res,500,{message:'The server could not complete your request. Please email info@migrationfactor.com.'});else res.end()}
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||3000),host=process.env.HOST||'0.0.0.0';createApp().listen(port,host,()=>{console.log(`Migration Factor listening on ${host}:${port}`);for(const addresses of Object.values(networkInterfaces()))for(const address of addresses||[])if(address.family==='IPv4'&&!address.internal)console.log(`Network: http://${address.address}:${port}/`)})}
