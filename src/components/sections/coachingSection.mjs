import {coaching} from '../../constants/content.mjs';
import {brandIcon} from '../shared/brand-icon.mjs';
import {title} from '../shared/title.mjs';
export function coachingSection(){return `<section class="section coaching-section"><div class="container">${title('IELTS & PTE COACHING','Prepare for your English language test.')}<div class="coaching-programs">${coaching.map(c=>`<a class="coaching-card reveal" href="/coaching/${c.slug}/">${brandIcon(c.slug==='ielts'?'coachingIELTS':'coachingPTE')}<h3>${c.name}</h3><p>${c.text}</p></a>`).join('')}</div></div></section>`}
