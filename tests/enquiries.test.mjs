import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createApp} from '../scripts/server.mjs';
import {validateEnquiry} from '../src/services/enquiries.mjs';
const valid={name:'Test Enquiry',email:'test@example.com',phone:'',service:'Student Visa',message:'This is a local automated test.',consent:true};
test('rejects missing consent, invented services, invalid email and oversized content',()=>{const {errors}=validateEnquiry({...valid,email:'wrong',service:'Fake service',consent:false,message:'x'.repeat(3001)});assert.deepEqual(Object.keys(errors).sort(),['consent','email','message','service'])});
test('rejects non-object payloads and honeypot submissions',()=>{assert.ok(validateEnquiry(null).errors.form);assert.ok(validateEnquiry({...valid,website:'spam'}).errors.form)});
test('server persists accepted enquiry, rejects invalid input and never falsely claims email delivery',async()=>{
 const dataDir=await mkdtemp(path.join(tmpdir(),'migration-factor-test-'));const app=createApp({dataDir,webhook:'',rateLimit:50});await new Promise(r=>app.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${app.address().port}`;
 try{const post=(body,headers={})=>fetch(origin+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
 let response=await post({...valid,consent:false});assert.equal(response.status,422);
 response=await post(valid,{'Origin':'https://unrelated.example'});assert.equal(response.status,403);
 response=await post(valid);assert.equal(response.status,201);const result=await response.json();assert.equal(result.delivery,'local');assert.match(result.message,/not been emailed/);
 const records=(await readFile(path.join(dataDir,'enquiries.ndjson'),'utf8')).trim().split('\n');assert.equal(records.length,1);assert.equal(JSON.parse(records[0]).id,result.id);
 assert.equal((await fetch(origin+'/data/enquiries.ndjson')).status,404);
 assert.equal((await fetch(origin+'/missing-page/')).status,404);
 assert.equal((await fetch(origin+'/api/enquiries')).status,405);
 response=await fetch(origin+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:'{invalid'});assert.equal(response.status,400);
 }finally{await new Promise(r=>app.close(r));await rm(dataDir,{recursive:true,force:true})}
});
test('serves typed, cached assets and blocks oversized requests and excessive attempts',async()=>{
 const dataDir=await mkdtemp(path.join(tmpdir(),'migration-factor-security-test-'));
 const app=createApp({dataDir,webhook:'',rateLimit:2});
 await new Promise(r=>app.listen(0,'127.0.0.1',r));
 const origin=`http://127.0.0.1:${app.address().port}`;
 try {
  const asset=await fetch(origin+'/brand/favicon.png?v=0123456789ab');
  assert.equal(asset.status,200);
  assert.equal(asset.headers.get('content-type'),'image/png');
  assert.match(asset.headers.get('cache-control'),/immutable/);
  assert.equal(asset.headers.get('x-content-type-options'),'nosniff');
  const cached=await fetch(origin+'/brand/favicon.png',{headers:{'If-None-Match':asset.headers.get('etag')}});
  assert.equal(cached.status,304);
  const post=body=>fetch(origin+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body});
  assert.equal((await post(JSON.stringify({...valid,message:'é'.repeat(9000)}))).status,413);
  const accepted=await post(JSON.stringify({...valid,name:'محمد Test',message:'Unicode enquiry محفوظ correctly.'}));
  assert.equal(accepted.status,201);
  const saved=JSON.parse((await readFile(path.join(dataDir,'enquiries.ndjson'),'utf8')).trim());
  assert.equal(saved.name,'محمد Test');
  assert.equal((await post(JSON.stringify(valid))).status,429);
  assert.equal((await fetch(origin+'/services')).status,200);
  assert.equal((await fetch(origin+'/missing-asset.png')).status,404);
 } finally {
  await new Promise(r=>app.close(r));
  await rm(dataDir,{recursive:true,force:true});
 }
});
