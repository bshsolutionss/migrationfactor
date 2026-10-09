import {assessmentFields,assessmentFieldIsActive,assessmentProfileEntries,assessmentGuidance,buildAssessmentEnquiry} from './visa-assessment.mjs';
import {validateEnquiryFields} from './enquiry-validation.mjs';

/** Attach the same wizard to the static site and the Next.js client component.
 * @param {HTMLFormElement} form
 */
export function initVisaAssessment(form) {
 const events=new AbortController();
 const signal=events.signal;
 const panels=[...form.querySelectorAll('[data-assessment-step]')];
 const progress=[...form.querySelectorAll('.assessment-progress li')];
 const stepLabel=form.querySelector('[data-assessment-step-label]');
 const status=form.querySelector('[data-assessment-status]');
 const actions=form.querySelector('.assessment-actions');
 const back=form.querySelector('[data-assessment-back]');
 const next=form.querySelector('[data-assessment-next]');
 const complete=form.querySelector('[data-assessment-complete]');
 const service=form.elements.namedItem('service');
 const serviceNames=new Set([...service.options].filter(option=>option.value).map(option=>option.value));
 let step=0;
 let busy=false;
 const values=()=>({...Object.fromEntries(new FormData(form)),consent:form.elements.namedItem('consent').checked});

 function fieldError(name,message) {
  const input=form.elements.namedItem(name);
  if(input)input.setAttribute('aria-invalid',String(Boolean(message)));
  const error=form.querySelector(`#assessment-${name}-error`);
  if(error)error.textContent=message||'';
 }

 function updateConditionalFields() {
  const profile=values();
  for(const field of assessmentFields) {
   const input=form.elements.namedItem(field.name);
   const active=assessmentFieldIsActive(field,profile);
   input.disabled=!active;
   form.querySelector(`[data-profile-field="${field.name}"]`).hidden=!active;
   if(!active)fieldError(field.name,'');
  }
 }

 function renderSummary() {
  const profile=values();
  form.querySelector('[data-assessment-guidance]').textContent=assessmentGuidance(profile);
  const summary=form.querySelector('[data-assessment-summary]');
  summary.replaceChildren();
  for(const [label,value] of assessmentProfileEntries(profile)) {
   const dt=document.createElement('dt');dt.textContent=label;
   const dd=document.createElement('dd');dd.textContent=value;
   summary.append(dt,dd);
  }
 }

 function showStep(index,focus=true) {
  step=index;
  panels.forEach((panel,i)=>{panel.hidden=i!==step});
  progress.forEach((item,i)=>{if(i===step)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');item.classList.toggle('is-done',i<step)});
  stepLabel.textContent=`Step ${step+1} of 3 · ${['Your plans','Your profile','Review & send'][step]}`;
  back.hidden=step===0;
  next.querySelector('span').textContent=step===2?'Send my profile':'Continue';
  status.textContent='';status.classList.remove('error');
  if(step===2)renderSummary();
  if(focus)panels[step].querySelector('legend').focus();
 }

 function validateStep(index) {
  let firstInvalid;
  for(const input of panels[index].querySelectorAll('input,select')) {
   if(input.disabled||input.name==='website')continue;
   const valid=input.checkValidity();
   fieldError(input.name,valid?'':input.validationMessage);
   if(!valid&&!firstInvalid)firstInvalid=input;
  }
  if(firstInvalid){showStep(index,false);firstInvalid.focus();return false}
  return true;
 }

 form.addEventListener('input',event=>{if(event.target.name)fieldError(event.target.name,'')},{signal});
 form.addEventListener('change',updateConditionalFields,{signal});
 back.addEventListener('click',()=>{if(!busy)showStep(step-1)},{signal});
 form.querySelector('[data-assessment-restart]').addEventListener('click',()=>{
  form.reset();complete.hidden=true;actions.hidden=false;stepLabel.hidden=false;
  form.querySelector('.assessment-progress').hidden=false;
  form.querySelectorAll('[aria-invalid]').forEach(input=>input.removeAttribute('aria-invalid'));
  form.querySelectorAll('.field-error').forEach(error=>error.textContent='');
  updateConditionalFields();showStep(0);
 },{signal});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;
  updateConditionalFields();
  if(!validateStep(step))return;
  if(step<2){showStep(step+1);return}
  for(let i=0;i<2;i++)if(!validateStep(i))return;
  const {data,errors}=validateEnquiryFields(buildAssessmentEnquiry(values()),serviceNames);
  if(Object.keys(errors).length){
   const [name,message]=Object.entries(errors)[0];fieldError(name,message);
   if(name==='service')showStep(0,false);
   status.textContent=message;status.classList.add('error');
   const input=form.elements.namedItem(name);if(input&&name!=='website')input.focus();else status.focus();
   return;
  }
  busy=true;next.disabled=true;back.disabled=true;form.setAttribute('aria-busy','true');
  next.querySelector('span').textContent='Sending profile…';status.textContent='';status.classList.remove('error');
  try {
   const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal});
   const result=await response.json();
   if(!response.ok){Object.entries(result.errors||{}).forEach(([name,message])=>fieldError(name,message));throw new Error(result.message||'Your profile could not be saved. Please try again.')}
   // Use the backend's exact delivery message, including local-only saves or failed forwarding.
   form.querySelector('[data-assessment-confirmation]').textContent=result.message;
   panels.forEach(panel=>{panel.hidden=true});actions.hidden=true;stepLabel.hidden=true;
   form.querySelector('.assessment-progress').hidden=true;complete.hidden=false;
   status.textContent='Profile saved.';status.focus();
  } catch(error) {
   if(signal.aborted)return;
   status.textContent=error instanceof TypeError?'Connection failed. Your profile was not confirmed. Please try again or email info@migrationfactor.com.':error.message;
   status.classList.add('error');status.focus();
  } finally {
   busy=false;next.disabled=false;back.disabled=false;form.removeAttribute('aria-busy');next.querySelector('span').textContent='Send my profile';
  }
 },{signal});
 fetch('/api/config',{signal}).then(response=>response.ok?response.json():null).then(config=>{
  if(!config||signal.aborted)return;
  form.querySelector('[data-assessment-delivery]').textContent=config.deliveryConfigured?
   'Your profile will be saved and forwarded to the configured enquiry service.':
   'Your profile can be saved on this server, but email delivery is not configured. For a direct response, email info@migrationfactor.com.';
 }).catch(()=>{});
 updateConditionalFields();showStep(0,false);
 return ()=>events.abort();
}
