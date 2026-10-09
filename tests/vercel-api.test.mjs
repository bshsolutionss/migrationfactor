import test from 'node:test';
import assert from 'node:assert/strict';
import configHandler from '../api/config.js';
import enquiriesHandler from '../api/enquiries.js';

test('Vercel api/config returns deliveryConfigured status', async () => {
  let statusCode = 200;
  let responseData = null;
  const req = {
    method: 'GET',
    headers: {}
  };
  const res = {
    setHeader() {},
    writeHead(code) { statusCode = code; },
    status(code) { statusCode = code; return this; },
    json(data) { responseData = data; return this; },
    end(str) { if (str) responseData = JSON.parse(str); }
  };

  await configHandler(req, res);
  assert.equal(statusCode, 200);
  assert.equal(typeof responseData.deliveryConfigured, 'boolean');
});

test('Vercel api/enquiries handles POST validation and submissions', async () => {
  let statusCode = 200;
  let responseData = null;
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: {
      name: 'Test Person',
      email: 'test@example.com',
      service: 'Student Visa',
      consent: true,
      message: 'Hello from test'
    }
  };
  const res = {
    setHeader() {},
    writeHead(code) { statusCode = code; },
    status(code) { statusCode = code; return this; },
    json(data) { responseData = data; return this; },
    end(str) { if (str) responseData = JSON.parse(str); }
  };

  await enquiriesHandler(req, res);
  assert.equal(statusCode, 201);
  assert.ok(responseData.id);
  assert.ok(responseData.message);
});
