 const header=document.querySelector('.header'), back=document.querySelector('.back-top');
 const scrollState=()=>{header.classList.toggle('scrolled',scrollY>40);back.classList.toggle('visible',scrollY>650)};
 addEventListener('scroll',scrollState,{passive:true});scrollState();
 const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('#primary-nav');
 const closeMenu=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');toggle.querySelector('.sr-only').textContent='Open navigation'};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);toggle.querySelector('.sr-only').textContent=open?'Close navigation':'Open navigation'});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus()}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu()});
 matchMedia('(min-width:1024px)').addEventListener('change',closeMenu);
