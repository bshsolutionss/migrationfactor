import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTool } from '../src/features/immigration-tools/calculators';
import { fields, validateAnswers, type Answers } from '../src/features/immigration-tools/fields';
import { type ToolSlug } from '../src/features/immigration-tools/catalog';

// Expected amounts are independently transcribed from the official sources listed
// in IMPLEMENTATION.md, not derived by calling the production fee/point tables.
const points: Answers = { subclass: '189', age: '30', english: 'superior', overseas: '5', australian: '5', qualification: 'degree', study: 'yes', specialist: 'no', regionalStudy: 'yes', professionalYear: 'no', language: 'yes', partner: 'single' };
const run = (slug: ToolSlug, a: Answers) => calculateTool(slug, a, '2026-10-10');
test('PR: employment capped at 20, highest qualification and partner counted once', () => {
  // 30 + 20 + capped(10+15) + 15 + 5 + 0 + 5 + 0 + 5 + 10 = 110.
  assert.equal(run('pr-calculator', points).total, 110);
  assert.equal(run('pr-calculator', { ...points, subclass: '190', nomination: 'yes' }).total, 115);
  assert.equal(run('pr-calculator', { ...points, subclass: '491', nomination: 'yes' }).total, 125);
  assert.equal(run('pr-calculator', { ...points, subclass: '491', nomination: 'no' }).total, 110);
  assert.equal(run('pr-calculator', { ...points, nomination: 'yes' }).total, 110);
});
test('PR: age band boundaries and disqualifying age do not produce a visa approval', () => {
  for (const [age, expected] of [[17, 0], [18, 25], [24, 25], [25, 30], [32, 30], [33, 25], [39, 25], [40, 15], [44, 15], [45, 0]]) {
    const r = run('pr-calculator', { ...points, age: String(age) });
    assert.equal(r.items?.[0].amount, expected);
    if (age >= 45 || age < 18) assert.equal(r.checks?.[0].status, 'needs attention');
  }
});
test('PR: employment boundaries, dependent regional study, partner and English factors', () => {
  for (const [years, expected] of [[0, 0], [2.9, 0], [3, 5], [4.9, 5], [5, 10], [7.9, 10], [8, 15], [10, 15]]) assert.equal(run('pr-calculator', { ...points, overseas: String(years), australian: '0' }).items?.[2].amount, expected);
  for (const [years, expected] of [[.9, 0], [1, 5], [3, 10], [5, 15], [8, 20]]) assert.equal(run('pr-calculator', { ...points, overseas: '0', australian: String(years) }).items?.[2].amount, expected);
  assert.equal(run('pr-calculator', { ...points, study: 'no', regionalStudy: 'yes' }).items?.[6].amount, 0);
  assert.equal(run('pr-calculator', { ...points, partner: 'english' }).items?.[9].amount, 5);
  assert.equal(run('pr-calculator', { ...points, english: 'unknown' }).checks?.[1].status, 'needs attention');
});
test('Invalid, contradictory and incomplete inputs are rejected', () => {
  assert.throws(() => run('pr-calculator', {}));
  assert.ok(validateAnswers('pr-calculator', { ...points, overseas: '8', australian: '8' }).australian);
  assert.ok(validateAnswers('pr-calculator', { ...points, qualification: 'none', specialist: 'yes' }).specialist);
  for (const age of ['-1', 'NaN', 'Infinity', '2.5', '101']) assert.ok(validateAnswers('pr-calculator', { ...points, age }).age);
});
const applicant = { subclass: '482', concession: 'standard', adults: '1', children: '2', extra: 'no' };
test('2026 first instalments: 482 and permanent/regional family totals', () => {
  assert.equal(run('applicant-cost-calculator', applicant).total, 10040); // 4015 + 4015 + 2*1005
  assert.equal(run('applicant-cost-calculator', { ...applicant, subclass: '186' }).total, 12280); // 6140+3070+2*1535
  assert.equal(run('applicant-cost-calculator', { ...applicant, subclass: '494' }).total, 12280);
  assert.equal(run('applicant-cost-calculator', { ...applicant, concession: 'pacific' }).total, 8230);
  assert.equal(run('applicant-cost-calculator', { ...applicant, subclass: '186', concession: 'pacific' }).total, 10070);
  assert.equal(run('applicant-cost-calculator', { ...applicant, concession: 'other' }).total, undefined);
  assert.ok(validateAnswers('applicant-cost-calculator', { ...applicant, children: '-1' }).children);
  assert.ok(validateAnswers('applicant-cost-calculator', { ...applicant, adults: '1.5' }).adults);
});
test('Sponsorship: turnover boundary, duration, regional ENS and no invented professional fees', () => {
  const a = { subclass: '482', newSponsor: 'yes', turnover: 'small', years: '4', special: 'no' };
  assert.equal(run('sponsorship-cost-estimator', a).total, 5550); //420+330+4*1200
  assert.equal(run('sponsorship-cost-estimator', { ...a, turnover: 'large' }).total, 7950);
  assert.equal(run('sponsorship-cost-estimator', { ...a, years: '1', newSponsor: 'no' }).total, 1530);
  assert.equal(run('sponsorship-cost-estimator', { ...a, subclass: '186', ensStream: 'direct' }).total, 3540);
  assert.equal(run('sponsorship-cost-estimator', { ...a, subclass: '186', ensStream: 'transition', regional: 'yes' }).total, 3000);
  assert.equal(run('sponsorship-cost-estimator', { ...a, subclass: '494' }).total, 3420);
  assert.equal(run('sponsorship-cost-estimator', { ...a, special: 'yes' }).total, undefined);
});
function defaults(slug: ToolSlug): Answers { return Object.fromEntries(fields[slug].map(f => [f.key, f.options?.[0][0] ?? String(f.min)])); }
test('482: 2026 core/specialist salary boundaries and labour agreement isolation', () => {
  const base = { ...defaults('subclass-482-checker'), salary: '79423', experience: '1' };
  let r = run('subclass-482-checker', base);
  assert.equal(r.checks?.find(c => c.label === 'Income threshold')?.status, 'appears met');
  r = run('subclass-482-checker', { ...base, salary: '79422', experience: '.9' });
  assert.equal(r.checks?.find(c => c.label === 'Income threshold')?.status, 'needs attention');
  assert.equal(r.checks?.find(c => c.label === 'Relevant experience')?.status, 'needs attention');
  assert.equal(run('subclass-482-checker', { ...base, stream: 'specialist', salary: '146576' }).checks?.find(c => c.label === 'Income threshold')?.status, 'appears met');
  assert.equal(run('subclass-482-checker', { ...base, stream: 'specialist', salary: '146575' }).checks?.find(c => c.label === 'Income threshold')?.status, 'needs attention');
  r = run('subclass-482-checker', { ...base, stream: 'agreement', salary: '0' });
  assert.ok(!r.checks?.some(c => c.label === 'Income threshold'));
  assert.equal(r.checks?.find(c => c.label === 'Agreement salary')?.status, 'needs verification');
});
test('Visa quiz never recommends closed 188 as an open pathway', () => {
  const base = { ...defaults('visa-quiz'), goal: 'business', age: '30' };
  assert.match(run('visa-quiz', base).pathways!.join(' '), /closed to new applications/);
  assert.match(run('visa-quiz', { ...base, goal: 'study' }).pathways!.join(' '), /Student visa/);
  assert.match(run('visa-quiz', { ...base, goal: 'skilled', occupation: 'yes', employer: 'yes', regional: 'yes' }).pathways!.join(' '), /491/);
});
test('General and employer checks distinguish unknowns and failed criteria', () => {
  const general = run('eligibility-checker', { ...defaults('eligibility-checker'), age: '45', character: 'review', employer: 'yes' });
  assert.equal(general.checks?.find(c => c.label === 'Character review')?.status, 'needs verification');
  assert.ok(!general.pathways?.some(p => p.startsWith('189')));
  const business = run('business-sponsor-checker', { ...defaults('business-sponsor-checker'), subclass: '494', regional: 'no', salary: '79423' });
  assert.equal(business.checks?.find(c => c.label === 'Regional position')?.status, 'needs attention');
  assert.equal(business.checks?.find(c => c.label === 'Nominee eligibility')?.status, 'needs verification');
});
test('Financial year rollover withholds outdated fees', () => {
  const result = calculateTool('applicant-cost-calculator', applicant, '2027-07-01');
  assert.equal(result.total, undefined); assert.match(result.title, /verification/);
});
