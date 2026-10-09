import {company} from '../../constants/content.mjs';
import {esc as escapeHtml} from '../shared/escape.mjs';

export function support(){
 const slides=[['OUR MISSION','Guidance with purpose.',company.mission,'portraitYoungOne'],['OUR VISION','New beginnings beyond borders.',company.vision,'portraitYoungTwo']];
 return `<section class="section support-section" aria-roledescription="carousel" aria-label="Migration Factor mission and vision"><div class="container support-content reveal"><div class="support-orbits" aria-hidden="true">${['portraitYoungThree','portraitYoungFour','portraitYoungFive','portraitYoungSix'].map(name=>`<img src="/media/${name}.webp" alt="" width="100" height="100" loading="lazy">`).join('')}</div><div class="support-mark" aria-hidden="true"><img src="/media/portraitYoungOne.webp" alt="" width="200" height="200" loading="lazy"></div><div class="support-slides" aria-live="off">${slides.map(([label,title,text,portrait],i)=>`<article class="support-slide${i===0?' active':''}" aria-hidden="${i!==0}" data-portrait="/media/${portrait}.webp"><span class="eyebrow">${label}</span><h3>${title}</h3><p>${escapeHtml(text)}</p><strong>${company.name}</strong></article>`).join('')}</div><div class="support-controls">${slides.map(([label],i)=>`<button type="button" aria-label="Show ${label.toLowerCase()}" aria-pressed="${i===0}" data-slide="${i}"></button>`).join('')}<button class="support-pause" type="button" aria-label="Pause slides">Ⅱ</button></div></div></section>`;
}

