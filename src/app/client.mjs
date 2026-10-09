import {readFile} from 'node:fs/promises';
import {validateEnquiryFields} from '../lib/enquiry-validation.mjs';
import {assessmentFields,assessmentFieldIsActive,assessmentProfileEntries,assessmentGuidance,buildAssessmentEnquiry} from '../lib/visa-assessment.mjs';
import {initVisaAssessment} from '../lib/visa-assessment-client.mjs';
export async function clientScript(){
 const files=['../components/layout/client.js','../components/shared/motion.js','../components/sections/client.js','../components/forms/client.js'];
 const parts=await Promise.all(files.map(f=>readFile(new URL(f,import.meta.url),'utf8')));
 const assessmentScript=`const assessmentFields = ${JSON.stringify(assessmentFields)};\n`+
  [assessmentFieldIsActive,assessmentProfileEntries,assessmentGuidance,buildAssessmentEnquiry,initVisaAssessment].map(fn=>fn.toString()).join('\n')+
  '\ndocument.querySelectorAll("[data-visa-assessment]").forEach(form=>initVisaAssessment(form));\n';
 return "(() => {\n 'use strict';\n const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;\n"+validateEnquiryFields.toString()+'\n'+parts.join('\n')+'\n'+assessmentScript+'\n})();\n';
}
