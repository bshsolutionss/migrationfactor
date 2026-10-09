// Single business-content source: supplied Migration Factor report, PDF pages 3–5.
// These are summaries of the report, not independently verified migration advice.
export const company = {
  name: 'Migration Factor', tagline: 'Your Future Starts with the Right Destination.',
  email: 'info@migrationfactor.com', phone: '+61 426 122 786', tel: '+61426122786',
  overview: 'Migration Factor is a migration and visa consultancy based in Perth, Western Australia. We support students, professionals and families with overseas education, employment, permanent residence and family-reunification pathways.',
  mission: 'To help people achieve their dreams of studying, working and living in Australia through expert migration guidance and ethical consulting.',
  vision: 'To become a trusted name in migration consultancy, helping clients build new beginnings beyond borders.',
  offices: ['Mirrabooka, Perth, WA 6064', 'Cranbourne, Melbourne, VIC 3951'],
  hours: 'Monday–Friday', source: 'PDF pages 3 and 5'
};
export const services = [
  {slug:'student-visa',name:'Student Visa',icon:'study',group:'Education & travel',description:'Support for education in Australia and selected European destinations, including university selection, GTE/SOP, financial documents and visa preparation.', source:4},
  {slug:'visitor-visa',name:'Visitor Visa',icon:'globe',group:'Education & travel',description:'Guidance for visiting Australia, family visits and travel planning.',source:4},
  {slug:'australian-citizenship',name:'Australian Citizenship',icon:'document',group:'Education & travel',description:'Guidance through the Australian citizenship application journey.',source:4},
  {slug:'partner-visa',name:'Partner Visa',icon:'people',group:'Family & relationships',description:'Support for partner and prospective marriage pathways, including relationship evidence, statements and sponsor documentation.',source:4},
  {slug:'parent-visa',name:'Parent Visa',icon:'people',group:'Family & relationships',description:'Guidance for aged parent, contributory parent and sponsored parent pathways.',source:4},
  {slug:'employer-sponsored-visa',name:'Employer Sponsored Visa',icon:'case',group:'Work & business',description:'Support for employer-sponsored pathways, including employer sponsorship, nomination and documentation.',source:4},
  {slug:'skilled-visa',name:'GSM & Skilled Visa',icon:'case',group:'Work & business',description:'Support with expressions of interest, points strategy and skills assessments for skilled migration pathways.',source:4},
  {slug:'business-migration',name:'Business Migration',icon:'case',group:'Work & business',description:'The company report describes business innovation, investment and entrepreneur pathways. Ask the team to confirm current availability.',source:4},
  {slug:'humanitarian-protection',name:'Humanitarian & Protection',icon:'shield',group:'Protection & reviews',description:'Support for protection, refugee, special humanitarian and emergency humanitarian cases.',source:4},
  {slug:'appeals-reviews',name:'Appeals & Reviews',icon:'document',group:'Protection & reviews',description:'Support after a refusal or cancellation, including decision-letter review, evidence and written submissions. Check your deadline immediately.',source:4}
];
export const steps = [
  ['Eligibility Check','The team reviews your goals, background and visa preferences.','document'],
  ['Pathway Planning','A potential visa strategy is developed around your skills, experience and future ambitions.','globe'],
  ['Document Support','Get assistance organizing documents and meeting immigration standards.','folder'],
  ['Smart Submission','Your application is reviewed before submission to reduce common errors and improve presentation.','check']
];
export const countries = [
  {name:'Australia',code:'AU',flag:'🇦🇺',text:'Explore education, employment, permanent residence and family-reunification pathways with Migration Factor.',detail:'View our services',href:'/services/'},
  {name:'United Kingdom',code:'GB',flag:'🇬🇧'},
  {name:'Canada',code:'CA',flag:'🇨🇦'},
  {name:'United States',code:'US',flag:'🇺🇸'},
  {name:'New Zealand',code:'NZ',flag:'🇳🇿'},
  {name:'Europe',code:'EU',flag:'🇪🇺',text:'The report mentions student support for selected European destinations. Contact the team to discuss the destination you have in mind.'}
].map(c=>({...c,text:c.text||`The company report mentions opportunities related to ${c.name}. Contact the team to confirm the support available for your circumstances.`,detail:c.detail||'Discuss your destination',href:c.href||'/contact/'}));
export const coaching = [
  {slug:'ielts',name:'IELTS Coaching',icon:'study',text:'Listening, Reading, Writing and Speaking, with mock tests, personalized strategies and tutor feedback.',items:['Listening and Reading','Writing and Speaking','Mock tests and tutor feedback','Online classes and resource material']},
  {slug:'pte',name:'PTE Coaching',icon:'screen',text:'Computer-based exam patterns, smart techniques, time management and practice materials.',items:['Computer-based exam patterns','Smart techniques and time management','Practice materials','Online classes and tutor-led sessions']}
];
export const faqs = [
 ['How does the process start?','Start with an eligibility check. The team reviews your goals, background and visa preferences before developing a potential pathway.'],
 ['What information should I prepare?','Prepare your basic profile: passport, age, education, work history, English result, family details and current visa status. Request a document checklist from the team.'],
 ['Can you help with studying overseas?','The report describes student visa support for Australia and selected European destinations, including university selection, GTE/SOP, financial documents and visa preparation.'],
 ['Do you provide IELTS and PTE coaching?','Yes. Both programs mention online classes, tutor-led sessions and resource material. IELTS includes mock tests and tutor feedback; PTE focuses on computer-based exam patterns and time management.'],
 ['How can I find out about fees and timelines?','Request an eligibility assessment and ask for the pathway, estimated timeline, professional fee and government charges in writing and separately.'],
 ['What should I do after a refusal or cancellation?','Check the deadline immediately and contact a registered professional without delay. The report describes support with decision-letter review, evidence and written submissions.'],
 ['Where are your offices?','The report lists Mirrabooka, Perth, WA 6064 and Cranbourne, Melbourne, VIC 3951. Contact the team before visiting.'],
 ['How can I contact Migration Factor?','Call +61 426 122 786 or email info@migrationfactor.com. Office days are Monday–Friday.']
];
export const todos = [
 ['Testimonials & success stories','Supply approved client quotations, names, consent and supporting case details.'],
 ['Our team','Supply names, biographies, professional registration details and approved portrait photographs.'],
 ['Country details','Provide approved destination-specific services for the United Kingdom, Canada, United States, New Zealand and individual European countries.'],
 ['Claims & counters','Verify the reported 24 years, 4.8/5 rating, 1,500+ customers, 97% success rate and 48-hour response promise before publishing them.'],
 ['Service review','Review current terminology, subclass availability, business migration programs, GTE/SOP and tribunal references with a qualified professional.'],
 ['Contact & hours','Confirm the Melbourne postcode, complete street addresses, appointment arrangements and opening times.'],
 ['Privacy & enquiry delivery','Supply an approved privacy policy, retention period and live enquiry delivery endpoint. Local submissions are stored on this server until an administrator removes them.'],
 ['Social links & newsletter','Supply official social URLs and newsletter content, consent wording and subscription provider.'],
 ['Photography','Exact reference images are included in the requested positions. Confirm replacement team/client identities before publishing profile or testimonial claims.'],
 ['Final editorial approval','Approve paraphrased website copy, FAQ answers, calls to action and SEO descriptions derived from the supplied report.']
];
