import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {pages} from '../src/app/pages.mjs';
import {pageSchema} from '../src/lib/seo.mjs';
import {origin} from '../src/config/site.mjs';

test('every generated page has SEO, valid internal destinations and existing assets',async()=>{
 const routes=new Set(pages.map(p=>p.path));
 for(const page of pages){
  const html=await readFile(`dist${page.path}index.html`,'utf8');
  assert.match(html,/<title>[^<]+<\/title>/);
  assert.match(html,/<meta name="description" content="[^"]+"/);
  assert.ok(html.includes(`rel="canonical" href="${origin}${page.path}"`));
  assert.match(html,/property="og:image"/);
  assert.match(html,/name="twitter:card"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,page.path);
  const schema=pageSchema(page);
  assert.ok(schema.some(s=>s['@type']==='Organization'));
  assert.equal(schema.filter(s=>s['@type']==='LocalBusiness').length,2);
  if(page.faq)assert.ok(schema.some(s=>s['@type']==='FAQPage'));
  for(const [,url] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   if(url.endsWith('/')||url==='/')assert.ok(routes.has(url),`${page.path} links to ${url}`);
   else await access('dist'+url);
  }
  for(const [,url] of html.matchAll(/src="(\/[^"?]+)(?:\?[^"]*)?"/g))await access('dist'+url);
  assert.doesNotMatch(html,/lorem ipsum|content-todo|reference-team|testimonial-avatar/i);
 }
 const sitemap=await readFile('dist/sitemap.xml','utf8');
 assert.equal((sitemap.match(/<url>/g)||[]).length,pages.filter(p=>!p.noindex).length);
 assert.ok(!sitemap.includes('/404/'));
});

test('homepage restores source section order using business content and excludes expert members',()=>{
 const home=pages.find(p=>p.path==='/').body;
 const sections=[...home.matchAll(/<section class="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(sections,['hero','features container','section about-section','section process-section','enquiry-section','section countries-section','section coaching-section','section support-section','section cta-section','section articles-section']);
 assert.doesNotMatch(home,/expert members|success rate|Jones Martin|Nazat Sarwar|Kevin Martin|50%/i);
});
