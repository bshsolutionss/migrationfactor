import { rulesEffectiveUntil, type ToolSlug } from './catalog';
import { validateAnswers, type Answers } from './fields';

export interface Check { label: string; status: 'appears met' | 'needs attention' | 'needs verification'; detail: string }
export interface ToolResult { title: string; total?: number; unit?: 'points' | 'AUD'; items?: { label: string; amount: number }[]; checks?: Check[]; notes: string[]; pathways?: string[] }
export const salaryThresholds = { core: 79423, specialist: 146576, regional: 79423 } as const;
// F2026L00874, Schedule 3 items 7, 62 and 64. Standard first instalment only.
export const visaFees = {
  '482': { standard: [4015, 4015, 1005], pacific: [3290, 3290, 825] },
  '186': { standard: [6140, 3070, 1535], pacific: [5035, 2515, 1260] },
  '494': { standard: [6140, 3070, 1535], pacific: [5035, 2515, 1260] },
} as const;
const total = (items: { amount: number }[]) => items.reduce((sum, item) => sum + item.amount, 0);
const confirmed = (a: Answers, key: string, label: string, detail: string): Check => ({ label, detail, status: a[key] === 'yes' ? 'appears met' : a[key] === 'no' ? 'needs attention' : 'needs verification' });
const check = (label: string, ok: boolean, detail: string): Check => ({ label, status: ok ? 'appears met' : 'needs attention', detail });
const verify = (label: string, detail: string): Check => ({ label, status: 'needs verification', detail });
const sharedNotes = ['Answers are self-reported. Supporting evidence, health, character and visa application conditions still need verification.'];

export function calculatePoints(a: Answers): ToolResult {
  const age = Number(a.age), overseas = Number(a.overseas), australian = Number(a.australian);
  const overseasPoints = overseas >= 8 ? 15 : overseas >= 5 ? 10 : overseas >= 3 ? 5 : 0;
  const australianPoints = australian >= 8 ? 20 : australian >= 5 ? 15 : australian >= 3 ? 10 : australian >= 1 ? 5 : 0;
  const employment = Math.min(20, overseasPoints + australianPoints);
  const items = [
    { label: 'Age', amount: age >= 18 && age < 25 ? 25 : age < 33 && age >= 25 ? 30 : age < 40 && age >= 33 ? 25 : age < 45 && age >= 40 ? 15 : 0 },
    { label: 'English', amount: a.english === 'superior' ? 20 : a.english === 'proficient' ? 10 : 0 },
    { label: `Overseas employment (${overseasPoints}) + Australian employment (${australianPoints}), capped at 20`, amount: employment },
    { label: 'Highest qualification', amount: a.qualification === 'doctorate' ? 20 : a.qualification === 'degree' ? 15 : ['diploma', 'recognised'].includes(a.qualification) ? 10 : 0 },
    { label: 'Australian study', amount: a.study === 'yes' ? 5 : 0 },
    { label: 'Specialist educational qualification', amount: a.specialist === 'yes' ? 10 : 0 },
    { label: 'Regional study', amount: a.study === 'yes' && a.regionalStudy === 'yes' ? 5 : 0 },
    { label: 'Professional Year', amount: a.professionalYear === 'yes' ? 5 : 0 },
    { label: 'Credentialled community language', amount: a.language === 'yes' ? 5 : 0 },
    { label: 'Partner circumstances', amount: ['single', 'skilled'].includes(a.partner) ? 10 : a.partner === 'english' ? 5 : 0 },
    { label: 'Nomination / eligible sponsorship', amount: a.nomination === 'yes' ? a.subclass === '190' ? 5 : a.subclass === '491' ? 15 : 0 : 0 },
  ];
  const score = total(items);
  return { title: `Subclass ${a.subclass} — estimated points`, total: score, unit: 'points', items,
    checks: [check('Age at invitation', age >= 18 && age < 45, 'This points-tested pathway requires the relevant age conditions at invitation; applicants must be under 45.'),
      check('Competent English or better', a.english !== 'unknown', 'Use the official test-date-specific requirements or accepted evidence.'),
      check('Points threshold', score >= 65, `${score >= 65 ? 'Meets' : 'Below'} the published 65-point threshold. Invitations can require a higher score.`),
      ...(a.subclass === '189' ? [] : [confirmed(a, 'nomination', 'Nomination or sponsorship', 'Selecting a visa subclass alone is not a nomination. The relevant conditions must be met.')])],
    notes: ['Only one highest qualification and one partner category are counted. Employment points are capped at 20.', 'Meeting 65 points does not guarantee an invitation. Occupation lists, skills assessment, evidence and all other visa criteria still apply.'] };
}

function applicantCost(a: Answers): ToolResult {
  if (a.concession === 'other') return { title: 'An individual fee calculation is needed', notes: ['A concession or special fee may apply. Use the official Visa Pricing Estimator; a standard total could be misleading.'] };
  const fees = visaFees[a.subclass as keyof typeof visaFees][a.concession as 'standard' | 'pacific'];
  const items = [{ label: 'Main applicant', amount: fees[0] }, { label: `${a.adults} additional adults × AUD${fees[1]}`, amount: Number(a.adults) * fees[1] }, { label: `${a.children} additional children × AUD${fees[2]}`, amount: Number(a.children) * fees[2] }];
  return { title: a.extra === 'yes' ? 'Listed first-instalment components only — other charges need checking' : 'Estimated first-instalment visa charges', total: total(items), unit: 'AUD', items, notes: [
    'Rates effective 1 July 2026. One main applicant and family members combining their applications are assumed. A separate subsequent-entrant application may be charged differently.',
    ...(a.concession === 'pacific' ? ['The Pacific-regional concession is conditional on an eligible passport and the legislation’s application rules. Passport eligibility has not been assessed by this tool.'] : []),
    'Excludes second instalments (including functional-English charges), subsequent temporary application charges, non-internet charges, payment surcharges, medicals, English tests, police checks, skills assessments, translations and professional fees.',
    'Sponsorship and nomination charges are separate employer costs. Confirm all amounts with the official estimator before paying.' ] };
}

function sponsorshipCost(a: Answers): ToolResult {
  if (a.special === 'yes') return { title: 'Special nomination costs need individual checking', notes: ['Exemptions, labour agreement concessions and replacement nominations can change the levy. Confirm the applicable charges with Home Affairs; a standard total is not shown.'] };
  const small = a.turnover === 'small';
  const regionalEns = a.subclass === '186' && a.ensStream !== 'direct' && a.regional === 'yes';
  const items = [
    { label: 'Standard business sponsorship application', amount: a.subclass !== '186' && a.newSponsor === 'yes' ? 420 : 0 },
    { label: 'Nomination application', amount: a.subclass === '482' ? 330 : a.subclass === '186' ? regionalEns ? 0 : 540 : 0 },
    { label: a.subclass === '482' ? `SAF levy · ${a.years} years × AUD${small ? 1200 : 1800}` : 'SAF levy · one nomination', amount: a.subclass === '482' ? Number(a.years) * (small ? 1200 : 1800) : small ? 3000 : 5000 },
  ];
  return { title: 'Estimated employer government charges', total: total(items), unit: 'AUD', items, notes: [
    'For one standard initial nomination. Existing 494 visa-holder replacement nominations, refunds and exemptions need separate checking. 186 does not require a standard business sponsorship application.',
    ...(regionalEns ? ['A nil 186 nomination fee is assumed for an eligible regional TRT/Labour Agreement position. Verify the postcode and stream before relying on the exemption.'] : []),
    'Employer sponsorship, nomination and SAF costs must not be passed to the applicant or their family.',
    'Applicant visa charges are calculated separately. Excludes professional fees, recruitment costs, regional certifying body fees, payment surcharges and other expenses.' ] };
}

function visaQuiz(a: Answers): ToolResult {
  const pathways: string[] = [], notes: string[] = [...sharedNotes];
  const checks: Check[] = [];
  if (a.goal === 'study') { pathways.push('Student visa (500): explore admission, Confirmation of Enrolment, Genuine Student, English, financial capacity and health insurance requirements.'); checks.push(confirmed(a, 'enrolment', 'Enrolment evidence', 'An offer alone is not necessarily the Confirmation of Enrolment needed for a visa.')); }
  if (a.goal === 'visit') pathways.push('Visitor visa (600): explore the appropriate stream. ETA/eVisitor options depend on passport nationality, which this quiz does not assess. Visitor permission does not generally permit work.');
  if (a.goal === 'partner') { pathways.push(a.partner === 'yes' ? 'Partner pathways (820/801 onshore or 309/100 offshore): check sponsor eligibility, relationship evidence and valid application requirements.' : 'Partner pathway needs further checking: the sponsor’s citizenship/status, relationship and other requirements have not been established.'); checks.push(confirmed(a, 'partner', 'Partner sponsor status', 'An eligible sponsor and qualifying relationship are required.')); }
  if (a.goal === 'business') { pathways.push('Business and investment plans require an individual assessment. Subclass 188 is closed to new applications.'); notes.push('Do not rely on an older quiz suggesting a new subclass 188 application. Exceptional achievements may warrant investigating the invitation-only National Innovation visa, but investment alone is not sufficient.'); }
  if (a.goal === 'skilled') {
    const suitableAge = Number(a.age) >= 18 && Number(a.age) < 45;
    if (suitableAge && a.occupation === 'yes') pathways.push('189 / 190: investigate occupation eligibility, a suitable skills assessment, competent English, points and invitation; 190 also needs state/territory nomination.');
    if (suitableAge && a.occupation === 'yes' && a.regional === 'yes') pathways.push('491: a regional skilled pathway to investigate, requiring nomination or eligible family sponsorship and the other points-tested requirements.');
    if (a.employer === 'yes') pathways.push('482: investigate employer nomination, occupation, relevant experience, English and salary for the correct stream. 186 and regional 494 may warrant a separate assessment of their age, experience and stream criteria.');
    if (!pathways.length) pathways.push('No clear skilled pathway can be identified from these answers. Review your occupation, evidence and sponsorship options with a migration professional.');
    checks.push(check('Points-tested age range', suitableAge, 'Being outside this age range does not rule out every Australian visa.'), confirmed(a, 'occupation', 'Skilled background', 'A job title alone does not establish an eligible occupation or skills assessment.'), verify('English and experience evidence', `English: ${a.english}. Relevant experience: ${a.experience} years. Eligibility depends on the specific pathway.`));
  }
  checks.push(confirmed(a, 'funds', 'Financial planning', 'Financial criteria differ between visas. No universal savings threshold is applied here.'));
  if (a.location === 'onshore') checks.push(a.history === 'no' ? verify('Onshore application conditions', 'Check current visa conditions even if no known immigration-history concerns exist.') : verify('Immigration history', 'Visa history and restrictions require individual review before an onshore application.'));
  return { title: 'Pathways to investigate', pathways, checks, notes };
}

function generalEligibility(a: Answers): ToolResult {
  const checks: Check[] = [check('Current passport', a.passport === 'valid', a.passport === 'expiring' ? 'Check validity for the visa and intended travel; this tool does not impose a universal six-month rule.' : 'A valid passport and identity evidence need checking.'),
    check('Age for points-tested skilled pathways', Number(a.age) >= 18 && Number(a.age) < 45, 'Other pathways may have different rules or exemptions.'),
    check('English evidence', a.english !== 'unknown', 'Evidence must meet the visa-specific requirements at the relevant time.'),
    check('Qualification evidence', a.qualification !== 'none', 'The assessing authority decides recognition and occupation suitability. Some pathways accept other evidence.'),
    confirmed(a, 'occupation', 'Eligible occupation', 'Different visa subclasses use different lists and caveats.'), confirmed(a, 'assessment', 'Skills assessment', 'Check the assessment authority, validity and intended visa subclass.'),
    a.character === 'clear' ? verify('Character', 'No known matters reported; the statutory character requirements still need assessment.') : verify('Character review', 'Offences or uncertainty require individual assessment; they do not automatically mean refusal.'),
    confirmed(a, 'health', 'Health requirements', 'Requirements and any waivers depend on the visa. Do not disclose medical details in this tool.')];
  const pathways = [];
  if (Number(a.age) >= 18 && Number(a.age) < 45 && a.occupation === 'yes') pathways.push('189 / 190: investigate the points test, invitation and any state nomination requirements.');
  if (Number(a.age) >= 18 && Number(a.age) < 45 && a.occupation === 'yes' && a.regional === 'yes') pathways.push('491: investigate regional nomination or eligible family sponsorship and points requirements.');
  if (a.employer === 'yes') pathways.push('482 / 186' + (a.regional === 'yes' ? ' / 494' : '') + ': investigate stream-specific employer, salary, work experience and applicant requirements.');
  if (!pathways.length) pathways.push('Further information is needed to identify a skilled or employer-sponsored pathway. The visa quiz also covers study, visitor and partner goals.');
  if (a.location === 'onshore') checks.push(verify('Current visa and application restrictions', a.history === 'no' ? 'Confirm application conditions and lawful status.' : 'Immigration history or uncertainty needs professional review.'));
  return { title: 'Preliminary criteria review', pathways, checks, notes: sharedNotes };
}

function sidEligibility(a: Answers): ToolResult {
  const agreement = a.stream === 'agreement';
  const threshold = a.stream === 'specialist' ? salaryThresholds.specialist : salaryThresholds.core;
  const checks = [confirmed(a, 'employer', 'Sponsor and nomination', 'An approved sponsor and approved nomination are required.'), confirmed(a, 'occupation', 'Occupation and stream', 'Core uses the CSOL and caveats; Specialist uses eligible ANZSCO groups; Labour Agreement uses the agreement.'),
    agreement ? verify('Relevant work experience', 'The agreement may set requirements or concessions; the standard threshold is not automatically applied.') : check('Relevant experience', Number(a.experience) >= 1, 'At least one year of relevant full-time-equivalent experience in the five years before application, with acceptable evidence.'),
    confirmed(a, 'qualification', 'Skills and qualifications', 'Occupation-specific skills, qualifications and evidence need checking.'), confirmed(a, 'assessment', 'Assessment and licensing', 'Any mandatory skills assessment, registration or licensing must be satisfied.'),
    confirmed(a, 'english', 'English or exemption', 'Use current approved tests, validity and stream-specific exemptions.'),
    agreement ? verify('Agreement salary', 'The applicable agreement and any concessions must be checked; no standard salary pass is inferred.') : check('Income threshold', Number(a.salary) >= threshold, `Standard ${a.stream === 'specialist' ? 'SSIT' : 'CSIT'} is AUD${threshold.toLocaleString('en-AU')} for nominations from 1 July 2026 to 30 June 2027. Earnings must be assessed under the official definition.`),
    confirmed(a, 'market', 'Market salary', 'A threshold alone is not enough; applicable market salary requirements also apply.')];
  if (agreement) checks.push(confirmed(a, 'agreement', 'Labour agreement', 'Confirm the actual agreement, occupation, earnings and permitted concessions.'));
  if (a.location === 'onshore') checks.push(verify('Onshore application validity', a.history === 'no' ? 'Verify current visa conditions and lawful status.' : 'Visa history or uncertainty requires individual review.'));
  return { title: '482 criteria to review', checks, notes: [...sharedNotes, 'No age threshold is applied to the standard 482 visa. This does not establish eligibility for a later permanent visa. Experience evidence must support the employment type selected.'] };
}

function businessEligibility(a: Answers): ToolResult {
  const agreement = a.subclass === '482' && a.stream === 'agreement' || a.subclass === '186' && a.ensStream === 'agreement';
  const threshold = a.subclass === '482' && a.stream === 'specialist' ? salaryThresholds.specialist : salaryThresholds.core;
  const checks = [confirmed(a, 'trading', 'Lawful operation', 'Evidence of lawful operation and business activity is needed; overseas business arrangements have specific rules.'),
    confirmed(a, 'compliance', 'Compliance', 'Adverse information and sponsorship obligations must be assessed.'), confirmed(a, 'capacity', 'Financial capacity', 'Ability to employ the nominee and meet employment costs needs evidence.'),
    confirmed(a, 'position', 'Genuine position and occupation', 'Check the correct occupation, duties, stream, employment term and full-time position.'),
    agreement ? verify('Agreement salary', 'Check the actual agreement and any approved concessions.') : check('Income threshold', Number(a.salary) >= threshold, `Relevant standard 2026–27 threshold: AUD${threshold.toLocaleString('en-AU')}. Earnings definitions, exemptions and timing must be checked.`),
    confirmed(a, 'market', 'Employment conditions and market salary', 'The threshold alone does not establish compliance.')];
  if (a.subclass !== '186') { checks.push(a.sponsor === 'approved' ? verify('Sponsorship approval', 'Check that approval is current and appropriate for this nomination.') : verify('Sponsorship application', 'First-time sponsors must obtain the relevant approval; selecting this option does not establish sponsorship eligibility.'), confirmed(a, 'recruitment', 'Labour market testing', 'Evidence, timing and any exemptions are visa-specific.')); }
  if (a.subclass === '494') checks.push(confirmed(a, 'regional', 'Regional position', 'Verify the postcode is designated for this visa.'), confirmed(a, 'rcb', 'Regional certification', 'Required regional certifying body advice must be obtained.'));
  if (a.subclass === '186' && a.ensStream === 'transition') checks.push(confirmed(a, 'trt', 'TRT employment and visa history', 'Check the required qualifying sponsored employment, visa history and all stream conditions.'));
  if (agreement) checks.push(confirmed(a, 'agreement', 'Labour agreement', 'Only the relevant agreement can establish its permitted occupations and concessions.'));
  checks.push(verify('Nominee eligibility', 'Applicant age, English, experience, skills assessment, health and character are a separate assessment. Business readiness alone is insufficient.'));
  return { title: `Subclass ${a.subclass} — business readiness`, checks, notes: ['A preliminary checklist cannot approve a sponsor or nomination. All evidence and visa-specific exceptions need individual review.', 'Employers must meet ongoing sponsorship obligations and cannot recover prohibited sponsorship costs from the nominee.'] };
}

export function calculateTool(slug: ToolSlug, answers: Answers, today = new Date().toISOString().slice(0, 10)): ToolResult {
  if (Object.keys(validateAnswers(slug, answers)).length) throw new Error('Please complete the required answers before calculating.');
  if (today > rulesEffectiveUntil && ['applicant-cost-calculator', 'sponsorship-cost-estimator', 'subclass-482-checker', 'business-sponsor-checker'].includes(slug)) return { title: 'Current rates require verification', notes: ['The published fee and salary data must be refreshed for the new financial year. Please use Home Affairs sources or contact our team; no outdated total or salary result is shown.'] };
  switch (slug) {
    case 'pr-calculator': return calculatePoints(answers);
    case 'visa-quiz': return visaQuiz(answers);
    case 'eligibility-checker': return generalEligibility(answers);
    case 'subclass-482-checker': return sidEligibility(answers);
    case 'business-sponsor-checker': return businessEligibility(answers);
    case 'sponsorship-cost-estimator': return sponsorshipCost(answers);
    case 'applicant-cost-calculator': return applicantCost(answers);
  }
}
