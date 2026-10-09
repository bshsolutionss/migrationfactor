import {services} from '../../constants/content.mjs';
import {icon} from '../ui/icon.mjs';
export function serviceGrid(){return `<div class="service-grid">${services.map((s,i)=>`<article class="service-card reveal" style="--delay:${i%3*100}ms">${icon(s.icon)}<span class="eyebrow">${s.group}</span><h2><a href="/services/${s.slug}/">${s.name}</a></h2><p>${s.description}</p><a class="text-link" href="/services/${s.slug}/">Explore this service</a></article>`).join('')}</div>`}
