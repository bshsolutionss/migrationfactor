import {photo} from '../shared/photo.mjs';
import {button} from '../ui/button.mjs';
export function cta(){return `<section class="section cta-section"><div class="container cta"><div class="cta-image">${photo('cta','cta-person reveal')}</div><div class="cta-copy"><span class="eyebrow light">PLAN YOUR NEXT STEP</span><h2 class="split">Your future starts with <br>the right destination.</h2>${button('Request an eligibility assessment')}</div></div></section>`}
