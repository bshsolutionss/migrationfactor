import {title} from '../shared/title.mjs';
import {company} from '../../constants/content.mjs';
import {button} from '../ui/button.mjs';
import {photo} from '../shared/photo.mjs';
export function about(){return `<section class="section about-section"><div class="container about-grid"><div>${title('ABOUT MIGRATION FACTOR','Guidance for your <br>next chapter.',false)}<p>${company.overview}</p><div class="about-support"><ul class="checks"><li>Personalized visa support</li><li>Professional and transparent guidance</li><li>Support from planning to submission</li></ul></div>${button('More about Migration Factor','/about/','outline')}</div><div class="about-photo reveal">${photo('about')}</div></div></section>`}
