(() => {
 'use strict';
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
function validateEnquiryFields(input, serviceNames) {
 if(!input||typeof input!=='object'||Array.isArray(input))return {errors:{form:'Invalid enquiry.'}};
 const data=Object.fromEntries(['name','email','phone','service','message','website'].map(key=>[key,typeof input[key]==='string'?input[key].trim():'']));
 data.consent=input.consent===true;
 const errors={};
 if(data.name.length<2||data.name.length>100)errors.name='Please enter your full name (2–100 characters).';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||data.email.length>254)errors.email='Please enter a valid email address.';
 if(data.phone&&!/^[+\d\s().-]{6,40}$/.test(data.phone))errors.phone='Please enter a valid phone number.';
 if(!serviceNames.has(data.service))errors.service='Choose a listed service.';
 if(data.message.length<10||data.message.length>3000)errors.message='Please enter between 10 and 3,000 characters.';
 if(!data.consent)errors.consent='Please agree before submitting your enquiry.';
 if(data.website)errors.form='This enquiry could not be accepted.';
 return {data,errors};
}
 const header=document.querySelector('.header'), back=document.querySelector('.back-top');
 const scrollState=()=>{header.classList.toggle('scrolled',scrollY>40);back.classList.toggle('visible',scrollY>650)};
 addEventListener('scroll',scrollState,{passive:true});scrollState();
 const toggle=document.querySelector('.menu-toggle'), drawer=document.querySelector('#contact-drawer');
 let previousOverflow='';
 const dropdownButtons=[...document.querySelectorAll('.nav-dropdown-toggle')];
 const closeDropdowns=(except)=>dropdownButtons.forEach(button=>{
  if(button===except)return;
  button.setAttribute('aria-expanded','false');
  document.getElementById(button.getAttribute('aria-controls')).hidden=true;
 });
 dropdownButtons.forEach(button=>button.addEventListener('click',()=>{
  const open=button.getAttribute('aria-expanded')!=='true';
  closeDropdowns(button);
  button.setAttribute('aria-expanded',String(open));
  document.getElementById(button.getAttribute('aria-controls')).hidden=!open;
 }));
 document.addEventListener('click',event=>{if(!event.target.closest('.nav-item'))closeDropdowns()});
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const activeButton=dropdownButtons.find(button=>button.getAttribute('aria-expanded')==='true');
  closeDropdowns();
  if(activeButton)activeButton.focus();
 });
 matchMedia('(max-width:1023px)').addEventListener('change',()=>closeDropdowns());
 toggle.addEventListener('click',()=>{
  closeDropdowns();
  previousOverflow=document.body.style.overflow;
  drawer.showModal();
  document.body.style.overflow='hidden';
  toggle.setAttribute('aria-expanded','true');
  toggle.querySelector('.sr-only').textContent='Close menu and contact details';
 });
 drawer.addEventListener('close',()=>{
  document.body.style.overflow=previousOverflow;
  toggle.setAttribute('aria-expanded','false');
  toggle.querySelector('.sr-only').textContent='Open menu and contact details';
  toggle.focus({preventScroll:true});
 });
 drawer.addEventListener('click',event=>{
  if(event.target!==drawer)return;
  const bounds=drawer.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)drawer.close();
 });

 // Headings retain their semantic text; only visual words are wrapped.
 if(!reduced && 'IntersectionObserver' in window){
  document.documentElement.classList.add('motion');
  document.querySelectorAll('.split').forEach(el=>{let index=0;const walk=node=>{[...node.childNodes].forEach(child=>{if(child.nodeType===Node.TEXT_NODE){const fragment=document.createDocumentFragment();child.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const mask=document.createElement('span');mask.className='word-mask';const span=document.createElement('span');span.className='word';span.textContent=word;span.style.setProperty('--word-delay',`${index++*25}ms`);mask.append(span);fragment.append(mask)});child.replaceWith(fragment)}else if(child.nodeType===Node.ELEMENT_NODE)walk(child)})};walk(el)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -10% 0px',threshold:0});
  document.querySelectorAll('.reveal,.split').forEach(el=>observer.observe(el));
 }
 const features=[...document.querySelectorAll('.feature')];features.forEach(el=>['mouseenter','focus'].forEach(event=>el.addEventListener(event,()=>features.forEach(x=>x.classList.toggle('active',x===el)))));
 const selectCountry=selected=>document.querySelectorAll('.country-row').forEach(row=>{const active=row===selected;row.classList.toggle('selected',active);row.querySelector('button').setAttribute('aria-expanded',String(active));row.querySelector('.country-panel').hidden=!active});
 document.querySelectorAll('.country-toggle').forEach(button=>{
  const activate=()=>selectCountry(button.closest('.country-row'));
  button.addEventListener('click',activate);
  button.addEventListener('focus',activate);
  button.addEventListener('mouseenter',()=>{if(matchMedia('(hover: hover)').matches)activate()});
 });
 const selectCountryHash=()=>{const selected=[...document.querySelectorAll('.country-row')].find(row=>`#${row.id}`===location.hash);if(selected)selectCountry(selected)};
 addEventListener('hashchange',selectCountryHash);selectCountryHash();
 const selectCountryFromHash=()=>{
  if(!/^#country-[A-Z]{2}$/.test(location.hash))return;
  const panel=document.getElementById(location.hash.slice(1));
  if(!panel)return;
  panel.closest('.country-row').querySelector('.country-toggle').click();
  panel.closest('.country-row').scrollIntoView({block:'start'});
 };
 addEventListener('hashchange',selectCountryFromHash);
 selectCountryFromHash();

// Source fade carousel, using existing company mission/vision copy.
document.querySelectorAll('.support-section').forEach(section=>{
 const slides=[...section.querySelectorAll('.support-slide')];
 const buttons=[...section.querySelectorAll('[data-slide]')];
 const pause=section.querySelector('.support-pause');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,manualPause=false,hovered=false,focused=false,timer;
 const show=index=>{
  active=index;
  section.querySelector('.support-mark img').src=slides[active].dataset.portrait;
  slides.forEach((slide,i)=>{slide.classList.toggle('active',i===active);slide.setAttribute('aria-hidden',String(i!==active))});
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
 };
 const update=()=>{
  clearInterval(timer);
  section.querySelector('.support-slides').setAttribute('aria-live',manualPause||focused||preference.matches?'polite':'off');
  if(!manualPause&&!hovered&&!focused&&!preference.matches)timer=setInterval(()=>show((active+1)%slides.length),3000);
 };
 buttons.forEach((button,i)=>button.addEventListener('click',()=>show(i)));
 pause.addEventListener('click',()=>{manualPause=!manualPause;pause.textContent=manualPause?'▶':'Ⅱ';pause.setAttribute('aria-label',manualPause?'Play slides':'Pause slides');update()});
 section.addEventListener('mouseenter',()=>{hovered=true;update()});
 section.addEventListener('mouseleave',()=>{hovered=false;update()});
 section.addEventListener('focusin',()=>{focused=true;update()});
 section.addEventListener('focusout',event=>{if(!section.contains(event.relatedTarget)){focused=false;update()}});
 preference.addEventListener('change',update);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(timer);else update()});
 update();
});

document.querySelectorAll('[data-service-count]').forEach(element=>{
 const total=Number(element.dataset.serviceCount);
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches||!('IntersectionObserver' in window))return;
 let frame;
 const observer=new IntersectionObserver(([entry])=>{
  if(!entry.isIntersecting)return;
  observer.disconnect();
  const started=performance.now();
  const tick=now=>{const progress=Math.min((now-started)/4000,1);element.textContent=String(Math.round(total*progress));if(progress<1)frame=requestAnimationFrame(tick)};
  frame=requestAnimationFrame(tick);
 });
 observer.observe(element);
 preference.addEventListener('change',()=>{if(preference.matches){cancelAnimationFrame(frame);element.textContent=String(total)}});
});


 const selectedService=new URLSearchParams(location.search).get('service');
 document.querySelectorAll('.enquiry-form').forEach(form=>{
  const service=form.elements.namedItem('service');if(selectedService&&[...service.options].some(o=>o.value===selectedService))service.value=selectedService;
  const status=form.querySelector('.form-status');
  function fieldError(name,message){const input=form.elements.namedItem(name);if(!input)return;input.setAttribute('aria-invalid',String(Boolean(message)));const error=document.getElementById(`${form.id}-${name}-error`);if(error)error.textContent=message||''}
  form.addEventListener('input',e=>{if(e.target.name)fieldError(e.target.name,'')});
  form.addEventListener('submit',async event=>{
   event.preventDefault();const values=Object.fromEntries(new FormData(form));
   const {data,errors}=validateEnquiryFields({...values,consent:form.elements.namedItem('consent').checked},new Set([...service.options].filter(o=>o.value).map(o=>o.value)));
   ['name','email','phone','service','message','consent'].forEach(name=>fieldError(name,errors[name]));status.textContent='';status.classList.remove('error');
   if(Object.keys(errors).length){const invalid=form.elements.namedItem(Object.keys(errors)[0]);if(invalid)invalid.focus();else{status.textContent=errors.form;status.classList.add('error');status.focus()}return}
   const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.querySelector('span').textContent='Saving enquiry…';form.setAttribute('aria-busy','true');
   try {const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(!response.ok){Object.entries(result.errors||{}).forEach(([name,message])=>fieldError(name,message));throw new Error(result.message||'Your enquiry could not be saved. Please try again.')};status.textContent=result.message;form.reset();status.focus()}
   catch(error){status.textContent=error instanceof TypeError?'Connection failed. Your enquiry was not confirmed. Please try again or email info@migrationfactor.com.':error.message;status.classList.add('error');status.focus()}
   finally{submit.disabled=false;submit.querySelector('span').textContent='Submit enquiry';form.removeAttribute('aria-busy')}
  });
 });
 // Change the delivery explanation only after the server confirms its configuration.
 if(document.querySelector('.enquiry-form'))fetch('/api/config').then(r=>r.json()).then(config=>{if(config.deliveryConfigured)document.querySelectorAll('.form-note').forEach(el=>el.textContent='Your details will be saved and forwarded to the configured enquiry service. Please do not send sensitive documents.')}).catch(()=>{});

const assessmentFields = [{"name":"service","label":"What would you like help with?","step":0,"required":true,"options":[]},{"name":"destination","label":"Preferred destination","step":0,"required":true,"options":["Australia","United Kingdom","Canada","New Zealand","United States","Europe","Not sure yet"]},{"name":"country","label":"Country you currently live in","step":0,"required":true,"max":80,"placeholder":"e.g. Pakistan or Australia","autocomplete":"country-name"},{"name":"age","label":"Age group","step":1,"required":true,"options":["Under 18","18–24","25–32","33–39","40–44","45–54","55 or older"]},{"name":"education","label":"Highest qualification","step":1,"required":true,"options":["Secondary school","Diploma / trade qualification","Bachelor’s degree","Master’s degree","Doctorate","Other / prefer to discuss"]},{"name":"english","label":"English test status","step":1,"required":true,"options":["Not taken yet","IELTS result available","PTE result available","Another English test","Not sure"]},{"name":"englishResult","label":"Test and score (optional)","step":1,"max":100,"placeholder":"e.g. IELTS overall 7, taken June 2026","when":"english"},{"name":"occupation","label":"Occupation (optional)","step":1,"max":100,"placeholder":"e.g. Software engineer","when":"work"},{"name":"experience","label":"Relevant work experience (optional)","step":1,"options":["Less than 1 year","1–2 years","3–4 years","5–7 years","8 years or more"],"when":"work"},{"name":"visaStatus","label":"Current visa status (optional)","step":1,"max":100,"placeholder":"e.g. Student visa, or not currently in Australia"}];
function assessmentFieldIsActive(field, values) {
 if(field.when==='work')return ['GSM & Skilled Visa','Employer Sponsored Visa','Business Migration'].includes(values.service);
 if(field.when==='english')return ['IELTS result available','PTE result available','Another English test'].includes(values.english);
 return true;
}
function assessmentProfileEntries(values) {
 return assessmentFields.filter(field=>assessmentFieldIsActive(field,values))
  .map(field=>[field.label.replace(' (optional)',''),String(values[field.name]||'').trim()])
  .filter(([,value])=>value);
}
function assessmentGuidance(values) {
 if(values.destination!=='Australia'&&values.destination!=='Not sure yet')return 'Ask our team to confirm the support available for your selected destination and visa goal.';
 if(['GSM & Skilled Visa','Employer Sponsored Visa','Business Migration'].includes(values.service))return 'Your occupation, qualifications, work history and English preparation are useful starting points for a consultant review.';
 if(values.service==='Student Visa')return 'Your study plans, qualifications and English preparation are useful starting points for a consultant review.';
 if(['Partner Visa','Parent Visa'].includes(values.service))return 'Our team can discuss your family circumstances, supporting evidence and possible next steps with you.';
 if(['Appeals & Reviews','Humanitarian & Protection'].includes(values.service))return 'If you have a refusal, cancellation or urgent deadline, contact our team directly rather than waiting for an online enquiry.';
 return 'Our team can review your goals and current circumstances, then discuss the documents and next steps relevant to your enquiry.';
}
function buildAssessmentEnquiry(values) {
 return {
  name:String(values.name||''),email:String(values.email||''),phone:String(values.phone||''),
  service:String(values.service||''),website:String(values.website||''),consent:values.consent===true,
  message:'2-minute Visa Assessment\n'+assessmentProfileEntries(values).map(([label,value])=>`${label}: ${value}`).join('\n'),
 };
}
function initVisaAssessment(form) {
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
document.querySelectorAll("[data-visa-assessment]").forEach(form=>initVisaAssessment(form));

})();
