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
