import {photo} from '../shared/photo.mjs';
import {form} from '../forms/enquiry.mjs';
export function enquiry(){return `<section class="enquiry-section"><div class="container enquiry-grid"><div class="enquiry-photo">${photo('enquiry','enquiry-cutout reveal')}</div>${form()}</div></section>`}
