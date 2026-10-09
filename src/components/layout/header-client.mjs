/** Shared dropdown and contact-drawer behavior for both website builds. */
export function initSiteHeader() {
 const header=document.querySelector('.header');
 const back=document.querySelector('.back-top');
 const toggle=header?.querySelector('.menu-toggle');
 const drawer=document.querySelector('#contact-drawer');
 if(!header||!toggle||!drawer)return ()=>{};
 const events=new AbortController();
 const signal=events.signal;
 let previousOverflow='';
 let scrollFrame=0;
 const scrollState=()=>{
  header.classList.toggle('scrolled',scrollY>40);
  back?.classList.toggle('visible',scrollY>650);
 };
 const onScroll=()=>{
  if(scrollFrame)return;
  scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;scrollState()});
 };
 window.addEventListener('scroll',onScroll,{passive:true,signal});
 scrollState();
 const dropdownButtons=[...header.querySelectorAll('.nav-dropdown-toggle')];
 const closeDropdowns=(except)=>dropdownButtons.forEach(button=>{
  if(button===except)return;
  button.setAttribute('aria-expanded','false');
  document.getElementById(button.getAttribute('aria-controls')).hidden=true;
 });
 closeDropdowns();
 dropdownButtons.forEach(button=>button.addEventListener('click',()=>{
  const open=button.getAttribute('aria-expanded')!=='true';
  closeDropdowns(button);
  button.setAttribute('aria-expanded',String(open));
  document.getElementById(button.getAttribute('aria-controls')).hidden=!open;
 },{signal}));
 document.addEventListener('click',event=>{if(!event.target.closest('.nav-item'))closeDropdowns()},{signal});
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const activeButton=dropdownButtons.find(button=>button.getAttribute('aria-expanded')==='true');
  closeDropdowns();
  activeButton?.focus();
 },{signal});
 const mobile=matchMedia('(max-width:1199px)');
 mobile.addEventListener('change',()=>closeDropdowns(),{signal});
 toggle.addEventListener('click',()=>{
  if(drawer.open)return;
  closeDropdowns();
  previousOverflow=document.body.style.overflow;
  drawer.showModal();
  document.body.style.overflow='hidden';
  toggle.setAttribute('aria-expanded','true');
  toggle.querySelector('.sr-only').textContent='Close menu and contact details';
 },{signal});
 drawer.addEventListener('close',()=>{
  document.body.style.overflow=previousOverflow;
  toggle.setAttribute('aria-expanded','false');
  toggle.querySelector('.sr-only').textContent='Open menu and contact details';
  toggle.focus({preventScroll:true});
 },{signal});
 drawer.addEventListener('click',event=>{
  if(event.target.closest('a[href]')){drawer.close();return}
  if(event.target!==drawer)return;
  const bounds=drawer.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)drawer.close();
 },{signal});
 return ()=>{
  events.abort();cancelAnimationFrame(scrollFrame);
  if(drawer.open){drawer.close();document.body.style.overflow=previousOverflow}
 };
}
