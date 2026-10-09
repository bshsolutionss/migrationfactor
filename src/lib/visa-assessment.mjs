// Shared profile questions and enquiry payload for the static and Next.js sites.
// This collects a profile for professional review; it does not calculate eligibility.
export const assessmentFields = [
 {name:'service',label:'What would you like help with?',step:0,required:true,options:[]},
 {name:'destination',label:'Preferred destination',step:0,required:true,options:['Australia','United Kingdom','Canada','New Zealand','United States','Europe','Not sure yet']},
 {name:'country',label:'Country you currently live in',step:0,required:true,max:80,placeholder:'e.g. Pakistan or Australia',autocomplete:'country-name'},
 {name:'age',label:'Age group',step:1,required:true,options:['Under 18','18–24','25–32','33–39','40–44','45–54','55 or older']},
 {name:'education',label:'Highest qualification',step:1,required:true,options:['Secondary school','Diploma / trade qualification','Bachelor’s degree','Master’s degree','Doctorate','Other / prefer to discuss']},
 {name:'english',label:'English test status',step:1,required:true,options:['Not taken yet','IELTS result available','PTE result available','Another English test','Not sure']},
 {name:'englishResult',label:'Test and score (optional)',step:1,max:100,placeholder:'e.g. IELTS overall 7, taken June 2026',when:'english'},
 {name:'occupation',label:'Occupation (optional)',step:1,max:100,placeholder:'e.g. Software engineer',when:'work'},
 {name:'experience',label:'Relevant work experience (optional)',step:1,options:['Less than 1 year','1–2 years','3–4 years','5–7 years','8 years or more'],when:'work'},
 {name:'visaStatus',label:'Current visa status (optional)',step:1,max:100,placeholder:'e.g. Student visa, or not currently in Australia'},
];

export function assessmentFieldIsActive(field, values) {
 if(field.when==='work')return ['GSM & Skilled Visa','Employer Sponsored Visa','Business Migration'].includes(values.service);
 if(field.when==='english')return ['IELTS result available','PTE result available','Another English test'].includes(values.english);
 return true;
}

export function assessmentProfileEntries(values) {
 return assessmentFields.filter(field=>assessmentFieldIsActive(field,values))
  .map(field=>[field.label.replace(' (optional)',''),String(values[field.name]||'').trim()])
  .filter(([,value])=>value);
}

export function assessmentGuidance(values) {
 if(values.destination!=='Australia'&&values.destination!=='Not sure yet')return 'Ask our team to confirm the support available for your selected destination and visa goal.';
 if(['GSM & Skilled Visa','Employer Sponsored Visa','Business Migration'].includes(values.service))return 'Your occupation, qualifications, work history and English preparation are useful starting points for a consultant review.';
 if(values.service==='Student Visa')return 'Your study plans, qualifications and English preparation are useful starting points for a consultant review.';
 if(['Partner Visa','Parent Visa'].includes(values.service))return 'Our team can discuss your family circumstances, supporting evidence and possible next steps with you.';
 if(['Appeals & Reviews','Humanitarian & Protection'].includes(values.service))return 'If you have a refusal, cancellation or urgent deadline, contact our team directly rather than waiting for an online enquiry.';
 return 'Our team can review your goals and current circumstances, then discuss the documents and next steps relevant to your enquiry.';
}

export function buildAssessmentEnquiry(values) {
 return {
  name:String(values.name||''),email:String(values.email||''),phone:String(values.phone||''),
  service:String(values.service||''),website:String(values.website||''),consent:values.consent===true,
  message:'2-minute Visa Assessment\n'+assessmentProfileEntries(values).map(([label,value])=>`${label}: ${value}`).join('\n'),
 };
}
