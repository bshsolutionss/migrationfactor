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
