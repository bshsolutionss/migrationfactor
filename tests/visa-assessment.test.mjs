import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {buildAssessmentEnquiry,assessmentProfileEntries,assessmentGuidance} from '../src/lib/visa-assessment.mjs';
import {validateEnquiry} from '../src/services/enquiries.mjs';
import {createApp} from '../scripts/server.mjs';

const profile={service:'GSM & Skilled Visa',destination:'Australia',country:'Pakistan',age:'25–32',education:'Bachelor’s degree',english:'IELTS result available',englishResult:'Overall 7',occupation:'Engineer',experience:'3–4 years',visaStatus:'Outside Australia',name:'Assessment Test',email:'assessment@example.com',phone:'+92 300 1234567',consent:true};

test('assessment enquiries preserve profile answers through the existing validated payload',()=>{
 const input=buildAssessmentEnquiry(profile);
 const {data,errors}=validateEnquiry(input);
 assert.deepEqual(errors,{});
 assert.equal(data.service,profile.service);
 for(const [,value] of assessmentProfileEntries(profile))assert.ok(data.message.includes(value));
 assert.match(data.message,/2-minute Visa Assessment/);
 assert.ok(validateEnquiry({...input,consent:false}).errors.consent);
 assert.ok(validateEnquiry({...input,website:'spam'}).errors.form);
});

test('changing pathway or English status excludes stale conditional answers from the lead',()=>{
 const input=buildAssessmentEnquiry({...profile,service:'Partner Visa',english:'Not taken yet'});
 assert.doesNotMatch(input.message,/Engineer|3–4 years|Overall 7/);
 assert.match(input.message,/Partner Visa/);
 assert.match(assessmentGuidance({...profile,destination:'Canada'}),/confirm the support available/);
 assert.match(assessmentGuidance({...profile,service:'Appeals & Reviews'}),/deadline/);
});

test('assessment submission is persisted with contact and profile details without claiming email delivery',async()=>{
 const dataDir=await mkdtemp(path.join(tmpdir(),'migration-factor-assessment-'));
 const app=createApp({dataDir,webhook:''});
 await new Promise(resolve=>app.listen(0,'127.0.0.1',resolve));
 try {
  const response=await fetch(`http://127.0.0.1:${app.address().port}/api/enquiries`,{
   method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(buildAssessmentEnquiry(profile)),
  });
  assert.equal(response.status,201);
  const result=await response.json();
  assert.equal(result.delivery,'local');
  assert.match(result.message,/not been emailed/);
  const saved=JSON.parse((await readFile(path.join(dataDir,'enquiries.ndjson'),'utf8')).trim());
  assert.equal(saved.name,profile.name);
  assert.equal(saved.email,profile.email);
  assert.equal(saved.message,buildAssessmentEnquiry(profile).message);
 } finally {
  await new Promise(resolve=>app.close(resolve));
  await rm(dataDir,{recursive:true,force:true});
 }
});
