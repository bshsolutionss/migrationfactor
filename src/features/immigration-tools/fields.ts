import type { ToolSlug } from './catalog';
export type Answers = Record<string, string>;
export interface Field { key: string; label: string; options?: readonly (readonly [string, string])[]; type?: 'number'; min?: number; max?: number; step?: number; help?: string; when?: (a: Answers) => boolean }
const yesNo = [['yes', 'Yes'], ['no', 'No'], ['unknown', 'Not sure']] as const;
const yesNoOnly = [['yes', 'Yes'], ['no', 'No']] as const;
const subclasses = [['482', '482 — Skills in Demand'], ['186', '186 — Employer Nomination Scheme'], ['494', '494 — Skilled Employer Sponsored Regional']] as const;
const select = (key: string, label: string, options: Field['options'] = yesNo, extra: Partial<Field> = {}): Field => ({ key, label, options, ...extra });
const number = (key: string, label: string, min: number, max: number, extra: Partial<Field> = {}): Field => ({ key, label, type: 'number', min, max, step: 1, ...extra });
const english = select('english', 'English evidence', [['competent', 'Competent'], ['proficient', 'Proficient'], ['superior', 'Superior'], ['unknown', 'Not tested / requirements not verified']], { help: 'Use Home Affairs definitions. Accepted tests and scores depend on test date; do not assume a test score has the same meaning across providers.' });
const age = number('age', 'Age in completed years', 0, 100);
const location = select('location', 'Where are you currently?', [['offshore', 'Outside Australia'], ['onshore', 'In Australia']]);
const immigration = select('history', 'Any visa refusal, cancellation, protection application, bridging visa or restrictive visa condition?', undefined, { when: a => a.location === 'onshore', help: 'No details are collected. An individual review may be needed to check whether an onshore application is valid.' });
const stream = select('stream', '482 stream', [['core', 'Core Skills'], ['specialist', 'Specialist Skills'], ['agreement', 'Labour Agreement']]);
const ensStream = select('ensStream', '186 stream', [['direct', 'Direct Entry'], ['transition', 'Temporary Residence Transition'], ['agreement', 'Labour Agreement']], { when: a => a.subclass === '186' });
const costFields = [select('subclass', 'Visa subclass', subclasses), select('concession', 'Does a fee concession or special application condition apply?', [['standard', 'Standard first instalment — no concessions'], ['pacific', 'Eligible Pacific-regional passport concession'], ['other', 'Other exemption, concession or unsure']], { help: 'Pacific-regional concession requires an eligible passport under the legislation. The estimator below does not determine passport eligibility. Verify it before selecting.' }), number('adults', 'Additional applicants aged 18 or over', 0, 20), number('children', 'Additional applicants under 18', 0, 20)];
export const fields: Record<ToolSlug, Field[]> = {
  'pr-calculator': [select('subclass', 'Skilled visa subclass', [['189', '189 — Skilled Independent'], ['190', '190 — Skilled Nominated'], ['491', '491 — Skilled Work Regional']]), age, english,
    number('overseas', 'Skilled employment outside Australia — years in the last 10 years', 0, 10, { step: .1, help: 'Count only qualifying paid work in your nominated or closely related occupation. Do not count overlapping employment twice.' }),
    number('australian', 'Skilled employment in Australia — years in the last 10 years', 0, 10, { step: .1, help: 'Work must meet the visa, remuneration and hours requirements. Combined Australian and overseas employment points are capped at 20.' }),
    select('qualification', 'Highest recognised qualification', [['doctorate', 'Doctorate'], ['degree', 'Bachelor degree or higher (other than doctorate)'], ['diploma', 'Australian diploma or trade qualification'], ['recognised', 'Qualification or award recognised by the assessing authority'], ['none', 'None of these']], { help: 'Overseas qualifications need recognition against the relevant Australian standard.' }),
    select('study', 'Meet the Australian study requirement?', yesNoOnly, { help: 'An eligible Australian qualification involving at least 2 academic years, completed over at least 16 calendar months, with all Home Affairs conditions met.' }),
    select('specialist', 'Eligible Australian specialist educational qualification?', yesNoOnly, { help: 'Australian masters by research or doctorate involving at least 2 academic years in an eligible STEM/ICT field. A coursework masters does not qualify.' }),
    select('regionalStudy', 'Eligible study and residence in a designated regional area?', yesNoOnly, { when: a => a.study === 'yes', help: 'Must satisfy the Australian study requirement and regional residence/study conditions; distance education is excluded.' }),
    select('professionalYear', 'Eligible Professional Year completed?', yesNoOnly, { help: 'At least 12 months in Accounting, ICT or Engineering in Australia, in the nominated/closely related occupation, completed in the 48 months before invitation.' }),
    select('language', 'Eligible credentialled community language qualification?', yesNoOnly, { help: 'Must hold the required NAATI credential, not simply speak another language.' }),
    select('partner', 'Partner circumstances', [['single', 'Single, or partner is an Australian citizen/permanent resident'], ['skilled', 'Partner meets all skilled-partner requirements'], ['english', 'Partner meets competent-English partner requirements only'], ['none', 'None of these']], { help: 'Skilled partner: same visa application, under 45, competent English and suitable skills assessment (not 485). English-only partner must also be included in the same visa application and not be an Australian citizen/PR.' }),
    select('nomination', 'Relevant nomination or eligible 491 family sponsorship confirmed?', yesNoOnly, { when: a => a.subclass !== '189', help: '190 requires state/territory nomination. 491 requires state/territory nomination or eligible family sponsorship. Selecting a subclass alone does not award these points.' }),
  ],
  'visa-quiz': [select('goal', 'What would you like to do?', [['skilled', 'Live and work in Australia'], ['study', 'Study'], ['partner', 'Join my partner'], ['visit', 'Visit for a holiday'], ['business', 'Business or investment']]), age, location,
    select('occupation', 'Do you have qualifications or experience in a skilled occupation?', undefined, { when: a => a.goal === 'skilled' }),
    { ...english, when: a => ['skilled', 'study'].includes(a.goal) },
    number('experience', 'Relevant work experience in years', 0, 60, { step: .1, when: a => a.goal === 'skilled' }),
    select('employer', 'Is an Australian employer willing to sponsor you?', undefined, { when: a => a.goal === 'skilled' }),
    select('regional', 'Would you consider a designated regional location?', undefined, { when: a => a.goal === 'skilled' }),
    select('partner', 'Is your partner an Australian citizen, permanent resident or eligible New Zealand citizen?', undefined, { when: a => a.goal === 'partner' }),
    select('enrolment', 'Do you have an offer or Confirmation of Enrolment?', undefined, { when: a => a.goal === 'study' }),
    select('funds', 'Have you checked the financial requirements for your plans?'), immigration],
  'eligibility-checker': [select('passport', 'Do you have a current passport?', [['valid', 'Yes'], ['expiring', 'Yes, but it expires soon'], ['none', 'No']]), age, english,
    select('qualification', 'Do you hold a qualification relevant to a skilled occupation?', [['overseas', 'Yes — overseas qualification'], ['australia', 'Yes — Australian qualification'], ['none', 'No / not yet verified']]),
    select('occupation', 'Is your occupation on the list for your intended visa?'), select('assessment', 'Do you have a suitable, valid skills assessment?'),
    select('employer', 'Do you have an employer willing to sponsor you?'), select('regional', 'Are you willing to live in a designated regional area?'),
    select('character', 'Are there any character matters needing review?', [['clear', 'No known matters'], ['review', 'Convictions, offences or other matters to review'], ['unknown', 'Not sure']], { help: 'A conviction is not automatically a refusal. The legal character test requires an individual assessment.' }),
    select('health', 'Have the relevant health requirements been verified?', undefined, { help: 'Do not enter medical information here.' }), location, immigration],
  'subclass-482-checker': [stream, select('employer', 'Is an approved sponsor willing to nominate you?'), select('occupation', 'Does the occupation meet your stream’s requirements?', undefined, { help: 'Core: applicable CSOL occupation and caveats. Specialist: eligible ANZSCO major group 1, 2, 4, 5 or 6. Labour Agreement: occupation in the agreement.' }),
    number('experience', 'Full-time-equivalent relevant work experience in the last 5 years', 0, 5, { step: .1, help: 'Relevant experience in your nominated occupation or a related field. Part-time work must be converted to its full-time equivalent; evidence and recency need verification.' }),
    select('employment', 'How was this experience gained?', [['full', 'Full-time'], ['part', 'Part-time'], ['casual', 'Casual'], ['self', 'Self-employed']]),
    select('qualification', 'Do your skills and qualifications meet the occupation’s requirements?'), select('assessment', 'Required skills assessment/licensing satisfied or verified exemption?'),
    select('english', 'Applicable English requirement met, or exemption verified?', undefined, { help: 'Check the stream-specific requirements, approved test date and evidence. Labour agreements can specify different requirements.' }),
    number('salary', 'Guaranteed annual cash earnings (AUD, excluding superannuation)', 0, 2000000), select('market', 'Salary meets the applicable market salary requirements?'),
    select('agreement', 'Occupation, earnings and concessions verified against your labour agreement?', undefined, { when: a => a.stream === 'agreement' }),
    location, immigration],
  'business-sponsor-checker': [select('subclass', 'Proposed visa pathway', subclasses), { ...stream, when: a => a.subclass === '482' }, ensStream,
    select('sponsor', 'Sponsorship position', [['approved', 'Already an approved sponsor'], ['new', 'First-time sponsor'], ['unknown', 'Not sure']]),
    select('trading', 'Is the business lawfully operating and actively trading?'), select('compliance', 'No adverse business or compliance information to address?'),
    select('capacity', 'Can you evidence capacity to employ and pay the nominee?'), select('position', 'Is the full-time position genuine and occupation eligible for this stream?'),
    select('recruitment', 'Required labour market testing completed or exemption verified?', undefined, { when: a => a.subclass !== '186' }),
    number('salary', 'Proposed annual cash earnings (AUD, excluding superannuation)', 0, 2000000), select('market', 'Market salary and equivalent Australian employment conditions verified?'),
    select('regional', 'Position in an eligible designated regional location?', undefined, { when: a => a.subclass === '494' }),
    select('rcb', 'Regional certifying body advice obtained where required?', undefined, { when: a => a.subclass === '494' }),
    select('trt', 'Nominee has the required sponsored employment and visa history?', undefined, { when: a => a.subclass === '186' && a.ensStream === 'transition' }),
    select('agreement', 'Relevant labour agreement and its nomination criteria verified?', undefined, { when: a => a.stream === 'agreement' && a.subclass === '482' || a.ensStream === 'agreement' && a.subclass === '186' }),
  ],
  'sponsorship-cost-estimator': [select('subclass', 'Visa subclass', subclasses), ensStream,
    select('regional', 'Is the 186 position in a designated regional location?', yesNoOnly, { when: a => a.subclass === '186' && a.ensStream !== 'direct' }),
    select('newSponsor', 'New standard business sponsorship application needed?', yesNoOnly, { when: a => a.subclass !== '186', help: 'Existing valid sponsorship does not attract a new sponsorship application charge.' }),
    select('turnover', 'Annual business turnover', [['small', 'Less than AUD10 million'], ['large', 'AUD10 million or more']]),
    number('years', 'Proposed nomination duration in years', 1, 4, { when: a => a.subclass === '482' }),
    select('special', 'Any levy exemption, labour agreement concession or special nomination circumstances?', [['no', 'No — standard nomination'], ['yes', 'Yes / not sure']], { help: 'Special cases such as eligible religious occupations need an individual calculation.' }),
  ],
  'applicant-cost-calculator': [...costFields, select('extra', 'Could a second instalment, subsequent temporary application charge or other special fee apply?', [['no', 'No known special charges'], ['yes', 'Yes / not sure']], { help: 'Includes functional-English second instalments, onshore temporary application history, non-internet lodgement and special exemptions. The tool calculates only the listed first-instalment components.' })],
};
export function visibleFields(slug: ToolSlug, answers: Answers) { return fields[slug].filter(field => !field.when || field.when(answers)); }
export function validateAnswers(slug: ToolSlug, answers: Answers) {
  const errors: Record<string, string> = {};
  for (const f of visibleFields(slug, answers)) {
    const value = answers[f.key];
    if (!value?.trim()) errors[f.key] = 'Please answer this question.';
    else if (f.options && !f.options.some(([key]) => key === value)) errors[f.key] = 'Choose one of the listed answers.';
    else if (f.type === 'number' && (!Number.isFinite(Number(value)) || Number(value) < f.min! || Number(value) > f.max! || Math.abs(Number(value) / f.step! - Math.round(Number(value) / f.step!)) > .000001)) errors[f.key] = `Enter a number from ${f.min} to ${f.max}${f.step === 1 ? ' in whole numbers' : ''}.`;
  }
  if (slug === 'pr-calculator' && Number(answers.overseas) + Number(answers.australian) > 10) errors.australian = 'Combined non-overlapping experience cannot exceed the last 10 years.';
  if (slug === 'pr-calculator' && answers.specialist === 'yes' && !['doctorate', 'degree'].includes(answers.qualification)) errors.specialist = 'A specialist research masters or doctorate must also be reflected in your highest qualification.';
  return errors;
}
