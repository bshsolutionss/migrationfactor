import {brand as namedBrand} from '../shared/brand.mjs';
import {company, services, countries} from '../../constants/content.mjs';
import {icon} from '../ui/icon.mjs';
import {navigation} from '../../constants/navigation.mjs';
export function header(path) {
 const links = navigation.map(([name,url]) => `<a href="${url}" ${path===url?'aria-current="page"':url!=='/'&&path.startsWith(url)?'aria-current="true"':''}>${name}</a>`).join('');
 const menus = {
  Home: [['Homepage','/'],['Explore services','/services/'],['Contact our team','/contact/']],
  About: [['Company profile','/about/'],['Frequently asked questions','/faq/'],['IELTS Coaching','/coaching/ielts/'],['PTE Coaching','/coaching/pte/']],
  Services: services.map(service=>[service.name,`/services/${service.slug}/`]),
  Countries: countries.map(country=>[country.name,`/countries/#country-${country.code}`]),
  Guides: [['Preparing your profile','/guides/preparing-your-profile/'],['Document checklist','/guides/document-checklist/']]
 };
 const headerNavigation=[navigation[0],navigation[1],navigation[3],navigation[2],['Guides','/guides/preparing-your-profile/'],navigation[5]];
 const desktopLinks = headerNavigation.map(([name,url]) => {
  const current = path===url?'aria-current="page"':url!=='/'&&path.startsWith(url)?'aria-current="true"':'';
  if(!menus[name])return `<a href="${url}" ${current}>${name}</a>`;
  const id=`nav-${name.toLowerCase()}`;
  return `<div class="nav-item"><div class="nav-item-label"><a href="${url}" ${current}>${name}</a><button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-controls="${id}" aria-label="Open ${name} menu"><span class="nav-chevron" aria-hidden="true"></span></button></div><div class="nav-submenu" id="${id}" hidden>${menus[name].map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}</div></div>`;
 }).join('');
 return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="container"><a href="mailto:${company.email}">${icon('mail')}${company.email}</a><span>${icon('clock')}${company.hours}</span><span class="top-location">Perth & Melbourne, Australia</span><a class="topbar-phone" href="tel:${company.tel}">${icon('phone')}${company.phone}</a></div></div>
<header class="header" id="header"><div class="nav-shell container">
 ${namedBrand()}
 <nav id="primary-nav" aria-label="Main navigation">${desktopLinks}</nav>
 <div class="header-actions"><a class="header-phone" href="tel:${company.tel}"><span class="header-phone-icon" aria-hidden="true"></span><span><small>Talk to our team</small><strong>${company.phone}</strong></span></a><button class="menu-toggle" type="button" aria-controls="contact-drawer" aria-haspopup="dialog" aria-expanded="false"><span class="hamburger" aria-hidden="true"></span><span class="sr-only">Open menu and contact details</span></button></div>
</div></header>
<dialog class="contact-drawer" id="contact-drawer" aria-labelledby="drawer-title">
 <div class="drawer-heading">${namedBrand().replace('/brand/mark.webp','/brand/favicon.png')}<h2 class="sr-only" id="drawer-title">Migration Factor contact details</h2><form method="dialog"><button class="drawer-close" type="submit" aria-label="Close menu and contact details">×</button></form></div>
 <div class="drawer-body"><div class="drawer-navigation" role="navigation" aria-label="Mobile navigation">${links}<a href="/guides/preparing-your-profile/">Preparing your profile</a><a href="/guides/document-checklist/">Document checklist</a></div><p>${company.overview}</p><div class="drawer-contact"><h3>Our offices</h3>${company.offices.map(office=>`<p>${office}</p>`).join('')}<h3>Email</h3><a href="mailto:${company.email}">${company.email}</a><h3>Call our team</h3><a href="tel:${company.tel}">${company.phone}</a><p class="drawer-hours">${company.hours}</p></div><a class="button" href="/contact/"><span>Request an eligibility assessment</span></a></div>
</dialog>`;
}
