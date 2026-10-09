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

