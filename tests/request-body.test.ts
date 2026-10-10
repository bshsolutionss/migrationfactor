import test from 'node:test';
import assert from 'node:assert/strict';
import { readBoundedBody } from '../src/lib/request-body';
test('Request body limit checks bytes, not characters', async () => {
  assert.equal(await readBoundedBody(new Request('https://example.invalid', { method: 'POST', body: 'éé' }), 4), 'éé');
  assert.equal(await readBoundedBody(new Request('https://example.invalid', { method: 'POST', body: 'ééé' }), 4), null);
  assert.equal(await readBoundedBody(new Request('https://example.invalid', { method: 'POST', body: 'ok', headers: { 'Content-Length': '20000' } })), null);
});
