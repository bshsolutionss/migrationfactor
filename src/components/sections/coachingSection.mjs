import {coaching} from '../../constants/content.mjs';
import {brandIcon} from '../shared/brand-icon.mjs';
import {icon} from '../ui/icon.mjs';
import {title} from '../shared/title.mjs';
export function coachingSection(){
 const groups=[
  [
   [coaching[0].name,'ielts','coachingIELTS'],
   ['Listening & Reading','ielts','document'],
   ['Writing & Speaking','ielts','people'],
   ['Mock Tests & Tutor Feedback','ielts','check']
  ],
  [
   [coaching[1].name,'pte','coachingPTE'],
   ['Smart Techniques & Time Management','pte','clock'],
   ['Practice Materials','pte','folder'],
   ['Online Classes & Tutor-led Sessions','pte','screen']
  ]
 ];
 const cards=items=>`<div class="coaching-card-group">${items.map(([label,slug,symbol])=>`<a class="coaching-card reveal" href="/coaching/${slug}/">${symbol.startsWith('coaching')?brandIcon(symbol):icon(symbol)}<h3>${label}</h3></a>`).join('')}</div>`;
 return `<section class="section coaching-section" id="coaching"><div class="container">${title('IELTS & PTE COACHING','Prepare for your<br>English language test.')}<div class="coaching-programs">${cards(groups[0])}<div class="coaching-banner reveal"><h3>Migration Factor</h3><div class="coaching-badge"><span>IELTS</span><span>PTE</span></div><p>ONLINE CLASSES.<br>PERSONALIZED PREPARATION.</p></div>${cards(groups[1])}</div></div></section>`;
}
