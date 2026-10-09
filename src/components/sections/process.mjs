import {title} from '../shared/title.mjs';
import {photo} from '../shared/photo.mjs';
import {steps} from '../../constants/content.mjs';
export function process(){return `<section class="section process-section">${title('OUR WORKING PROCESS','Your journey, one clear <br>step at a time.')}<div class="container steps">${photo('processTrack','process-track-image')}${steps.map(([n,d,ic],i)=>`<article class="step reveal" style="--delay:${i*100}ms"><div class="step-track"><span>0${i+1}</span>${photo(['processOne','processTwo','processThree','processThree'][i],'process-icon')}</div><h3>${n}</h3><p>${d}</p></article>`).join('')}</div></section>`}
