 const header=document.querySelector('.header'), back=document.querySelector('.back-top');
 const scrollState=()=>{header.classList.toggle('scrolled',scrollY>40);back.classList.toggle('visible',scrollY>650)};
 addEventListener('scroll',scrollState,{passive:true});scrollState();
 const toggle=document.querySelector('.menu-toggle'), drawer=document.querySelector('#contact-drawer');
 let previousOverflow='';
 toggle.addEventListener('click',()=>{
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
