 // Headings retain their semantic text; only visual words are wrapped.
 if(!reduced && 'IntersectionObserver' in window){
  document.documentElement.classList.add('motion');
  document.querySelectorAll('.split').forEach(el=>{let index=0;const walk=node=>{[...node.childNodes].forEach(child=>{if(child.nodeType===Node.TEXT_NODE){const fragment=document.createDocumentFragment();child.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return}const mask=document.createElement('span');mask.className='word-mask';const span=document.createElement('span');span.className='word';span.textContent=word;span.style.setProperty('--word-delay',`${index++*25}ms`);mask.append(span);fragment.append(mask)});child.replaceWith(fragment)}else if(child.nodeType===Node.ELEMENT_NODE)walk(child)})};walk(el)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -10% 0px',threshold:0});
  document.querySelectorAll('.reveal,.split').forEach(el=>observer.observe(el));
 }
 const features=[...document.querySelectorAll('.feature')];features.forEach(el=>['mouseenter','focus'].forEach(event=>el.addEventListener(event,()=>features.forEach(x=>x.classList.toggle('active',x===el)))));
 document.querySelectorAll('.country-toggle').forEach(button=>button.addEventListener('click',()=>{const selected=button.closest('.country-row');document.querySelectorAll('.country-row').forEach(row=>{const active=row===selected;row.classList.toggle('selected',active);row.querySelector('button').setAttribute('aria-expanded',String(active));row.querySelector('.country-panel').hidden=!active})}));
