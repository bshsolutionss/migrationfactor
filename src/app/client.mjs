import {readFile} from 'node:fs/promises';
import {validateEnquiryFields} from '../lib/enquiry-validation.mjs';
export async function clientScript(){
 const files=['../components/layout/client.js','../components/shared/motion.js','../components/forms/client.js'];
 const parts=await Promise.all(files.map(f=>readFile(new URL(f,import.meta.url),'utf8')));
 return "(() => {\n 'use strict';\n const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;\n"+validateEnquiryFields.toString()+'\n'+parts.join('\n')+'\n})();\n';
}
