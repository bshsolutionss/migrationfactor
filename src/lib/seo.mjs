import {company,faqs} from '../constants/content.mjs';
import {esc,header,footer} from '../components/index.mjs';
import {origin} from '../config/site.mjs';

export function pageSchema(page) {
 const organizationId = `${origin}/#organization`;
 const schema = [{
  '@context':'https://schema.org', '@type':'Organization', '@id':organizationId,
  name:company.name, logo:`${origin}/brand/social.webp`, url:origin,
  email:company.email, telephone:company.phone,
 }];
 company.offices.forEach((streetAddress,index)=>schema.push({
  '@context':'https://schema.org', '@type':'LocalBusiness',
  '@id':`${origin}/#office-${index+1}`, name:company.name,
  url:`${origin}/contact/`, telephone:company.phone, email:company.email,
  parentOrganization:{'@id':organizationId},
  address:{'@type':'PostalAddress',streetAddress,addressCountry:'AU'},
 }));
 if(page.faq) schema.push({
  '@context':'https://schema.org','@type':'FAQPage',
  mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})),
 });
 if(page.path!=='/'&&!page.noindex) schema.push({
  '@context':'https://schema.org','@type':'BreadcrumbList',
  itemListElement:[
   {'@type':'ListItem',position:1,name:'Home',item:origin},
   {'@type':'ListItem',position:2,name:page.name,item:origin+page.path},
  ],
 });
 return schema;
}

export function html(page, revision) {
 const canonical=origin+page.path;
 const title=page.name.includes(company.name)?page.name:`${page.name} | ${company.name}`;
 const description=page.description.slice(0,195);
 const social=`${origin}/brand/social.webp`;
 return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="/brand/favicon.png"><meta name="theme-color" content="#087780">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">${page.noindex?'<meta name="robots" content="noindex,follow">':''}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${company.name}"><meta property="og:image" content="${social}">
<meta property="og:image:alt" content="Migration Factor — Guiding your dreams beyond borders">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${social}">
<meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}">
<link rel="preload" href="/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css?v=${revision}">
${page.path==='/'?'<link rel="preload" href="/media/hero.webp" as="image">':''}
<script type="application/ld+json">${JSON.stringify(pageSchema(page)).replaceAll('<','\\u003c')}</script>
<script src="/site.js?v=${revision}" defer></script>
</head><body id="top" class="${page.path==='/'?'home':'inner-page'}">${header(page.path)}<main id="main">${page.body}</main>${footer()}</body></html>`;
}
