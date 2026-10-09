import {title} from '../shared/title.mjs';
import {faqs} from '../../constants/content.mjs';
import {button} from '../ui/button.mjs';
export function faqSection(){return `<section class="section"><div class="container faq-layout"><div>${title('YOUR QUESTIONS','A clearer start <br>to your journey.',false)}<p>Information from our company report, organized around your next steps.</p>${button('Speak with our team')}</div><div class="faq-list">${faqs.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>`}
