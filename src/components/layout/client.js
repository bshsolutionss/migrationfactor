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
