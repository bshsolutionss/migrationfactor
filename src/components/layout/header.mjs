import {headerBrand as brand, brand as namedBrand} from '../shared/brand.mjs';
import {company} from '../../constants/content.mjs';
import {icon} from '../ui/icon.mjs';
import {navigation} from '../../constants/navigation.mjs';
export function header(path) {
 const links = navigation.map(([name,url]) => `<a href="${url}" ${path===url?'aria-current="page"':url!=='/'&&path.startsWith(url)?'aria-current="true"':''}>${name}</a>`).join('');
 return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="container"><a href="mailto:${company.email}">${icon('mail')}${company.email}</a><span>${icon('clock')}${company.hours}</span><span class="top-location">Perth & Melbourne, Australia</span><a class="topbar-phone" href="tel:${company.tel}">${icon('phone')}${company.phone}</a></div></div>
<header class="header" id="header"><div class="nav-shell container">
 ${brand()}
 <nav id="primary-nav" aria-label="Main navigation">${links}</nav>
 <div class="header-actions"><a class="header-phone" href="tel:${company.tel}"><span class="header-phone-icon" aria-hidden="true"></span><span><small>Talk to our team</small><strong>${company.phone}</strong></span></a><button class="menu-toggle" type="button" aria-controls="contact-drawer" aria-haspopup="dialog" aria-expanded="false"><span class="hamburger" aria-hidden="true"></span><span class="sr-only">Open menu and contact details</span></button></div>
</div></header>
<dialog class="contact-drawer" id="contact-drawer" aria-labelledby="drawer-title">
 <div class="drawer-heading">${namedBrand().replace('/brand/mark.webp','/brand/favicon.png')}<h2 class="sr-only" id="drawer-title">Migration Factor contact details</h2><form method="dialog"><button class="drawer-close" type="submit" aria-label="Close menu and contact details">×</button></form></div>
 <div class="drawer-body"><div class="drawer-navigation" role="navigation" aria-label="Mobile navigation">${links}</div><p>${company.overview}</p><div class="drawer-contact"><h3>Our offices</h3>${company.offices.map(office=>`<p>${office}</p>`).join('')}<h3>Email</h3><a href="mailto:${company.email}">${company.email}</a><h3>Call our team</h3><a href="tel:${company.tel}">${company.phone}</a><p class="drawer-hours">${company.hours}</p></div><a class="button" href="/contact/"><span>Request an eligibility assessment</span></a></div>
</dialog>`;
}
