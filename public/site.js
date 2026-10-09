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
 const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('#primary-nav');
 const closeMenu=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');toggle.querySelector('.sr-only').textContent='Open navigation'};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);toggle.querySelector('.sr-only').textContent=open?'Close navigation':'Open navigation'});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus()}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu()});
 matchMedia('(min-width:1024px)').addEventListener('change',closeMenu);

 // Headings retain their semantic text; only visual words are wrapped.
 if(!reduced && 'IntersectionObserver' in window){
  document.documentElement.classList.add('motion');
  document.querySelectorAll('.split').forEach(el=>{let index=0;const walk=node=>{[...node.childNodes].forEach(child=>{if(child.nodeType===Node.TEXT_NODE){const fragment=document.createDocumentFragment();child.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const mask=document.createElement('span');mask.className='word-mask';const span=document.createElement('span');span.className='word';span.textContent=word;span.style.setProperty('--word-delay',`${index++*25}ms`);mask.append(span);fragment.append(mask)});child.replaceWith(fragment)}else if(child.nodeType===Node.ELEMENT_NODE)walk(child)})};walk(el)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -10% 0px',threshold:0});
  document.querySelectorAll('.reveal,.split').forEach(el=>observer.observe(el));
 }
 const features=[...document.querySelectorAll('.feature')];features.forEach(el=>['mouseenter','focus'].forEach(event=>el.addEventListener(event,()=>features.forEach(x=>x.classList.toggle('active',x===el)))));
 document.querySelectorAll('.country-toggle').forEach(button=>button.addEventListener('click',()=>{const selected=button.closest('.country-row');document.querySelectorAll('.country-row').forEach(row=>{const active=row===selected;row.classList.toggle('selected',active);row.querySelector('button').setAttribute('aria-expanded',String(active));row.querySelector('.country-panel').hidden=!active})}));

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

})();
