import test from 'node:test';
import assert from 'node:assert/strict';
import { csolData, searchOccupations } from '../src/features/immigration-tools/csol';
test('Official occupation snapshot has complete unique codes and resolvable caveats', () => {
  assert.equal(csolData.occupations.length, 456);
  assert.equal(new Set(csolData.occupations.map(o => o.code)).size, 456);
  for (const row of csolData.occupations) {
    assert.match(row.code, /^\d{6}$/);
    for (const id of row.sidCaveats) assert.ok((csolData.caveats.sid as Record<string, string>)[id]);
    for (const id of row.ensCaveats) assert.ok((csolData.caveats.ens as Record<string, string>)[id]);
  }
});
test('Occupation search supports case, whitespace, name, code and no matches', () => {
  assert.equal(searchOccupations('261313')[0].name, 'Software Engineer');
  assert.equal(searchOccupations('  SOFTWARE  engineer ')[0].code, '261313');
  assert.equal(searchOccupations('111111')[0].sidCaveats[0], '1');
  assert.match((csolData.caveats.sid as Record<string, string>)['1'], /180,001/);
  assert.equal(searchOccupations('not-an-occupation-xyz').length, 0);
  assert.equal(searchOccupations('').length, 456);
});
