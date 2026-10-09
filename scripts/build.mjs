import {mkdir,writeFile,copyFile,cp,rm} from 'node:fs/promises';
import {pages} from '../src/app/pages.mjs';
import {todos} from '../src/constants/content.mjs';
import {html} from '../src/lib/seo.mjs';
import {origin} from '../src/config/site.mjs';
import {clientScript} from '../src/app/client.mjs';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
// Build only the curated public assets. Never copy private sources or enquiry records.
await rm(new URL('../dist/',import.meta.url),{recursive:true,force:true});
await mkdir('dist',{recursive:true});
const script=await clientScript();
const hash=createHash('sha256').update(await readFile('src/styles/site.css')).update(script);
for(const folder of ['media','brand'])for(const name of (await readdir('public/'+folder)).sort())hash.update(await readFile('public/'+folder+'/'+name));
const revision=hash.digest('hex').slice(0,12);
for(const p of pages){
 const dir='dist'+p.path;await mkdir(dir,{recursive:true});
 const document=html(p,revision).replace(/((?:src|href)="\/(?:media|brand)\/[^"?]+)(")/g,`$1?v=${revision}$2`);
 await writeFile(dir+'index.html',document);
}
await copyFile('src/styles/site.css','dist/style.css');
await writeFile('dist/site.js',script);
for(const folder of ['media','brand','fonts'])await cp('public/'+folder,'dist/'+folder,{recursive:true});
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p=>!p.noindex).map(p=>`<url><loc>${origin}${p.path}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`);
try {
 const notFound = pages.find(p => p.path === '/404/');
 if (notFound) {
  const notFoundDoc = html(notFound, revision).replace(/((?:src|href)="\/(?:media|brand)\/[^"?]+)(")/g, `$1?v=${revision}$2`);
  await writeFile('dist/404.html', notFoundDoc);
 }
} catch {}
await mkdir('docs',{recursive:true});
await writeFile('docs/TODO.md',`# Content TODO\n\nSource: supplied PDF. Missing items are not invented.\n\n${todos.map(([n,d])=>`- **${n}:** ${d}`).join('\n')}\n`);
await writeFile('docs/routes.json',JSON.stringify(pages.map(({path,name})=>({path,name})),null,2));
try {
 await cp('dist', 'public', {recursive: true});
} catch {}
console.log(`Built ${pages.length} pages with curated assets.`);
