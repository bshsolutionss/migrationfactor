import test from 'node:test';
import assert from 'node:assert/strict';
import { pakistanDate, preferenceTimes, validateConsultation, type ConsultationDetails } from '../src/features/consultation-booking/model';
const now = new Date('2026-10-10T12:00:00Z');
const valid: ConsultationDetails = { format: 'video', date: '2026-10-12', time: '09:00', name: 'Test Person', email: 'qa@example.invalid', phone: '+923001234567', country: 'Pakistan', category: 'Student Visa', message: 'Test consultation preference.', consent: true };
test('Consultation validates Pakistan weekday schedule with 30-minute boundaries', () => {
  assert.deepEqual(validateConsultation(valid, now), {});
  assert.equal(preferenceTimes.length, 24);
  assert.equal(preferenceTimes.at(-1), '20:30');
  assert.ok(validateConsultation({ ...valid, date: '2026-10-11' }, now).date);
  assert.ok(validateConsultation({ ...valid, time: '21:00' }, now).time);
  assert.ok(validateConsultation({ ...valid, date: '2026-02-31' }, now).date);
  assert.ok(validateConsultation({ ...valid, date: '2026-10-09' }, now).time);
  assert.equal(pakistanDate(new Date('2026-10-11T20:00:00Z')), '2026-10-12');
});
test('Consultation rejects missing consent, invalid email, local-only phone and unsupported format', () => {
  for (const [key, value] of [['consent', false], ['email', 'wrong'], ['phone', '03001234567'], ['format', 'in-person'], ['name', ''], ['message', 'x']] as const) assert.ok(validateConsultation({ ...valid, [key]: value }, now)[key]);
});
