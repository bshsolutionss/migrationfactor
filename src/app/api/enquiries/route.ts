import { NextRequest, NextResponse } from 'next/server';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import { validateEnquiry, saveEnquiry, forwardEnquiry } from '@/lib/enquiries-service';
import { readBoundedBody } from '@/lib/request-body';

const limits = new Map<string, { start: number; count: number }>();

const securityHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!/^application\/json(?:;|$)/i.test(contentType)) {
      return NextResponse.json(
        { message: 'JSON content is required.' },
        { status: 415, headers: securityHeaders }
      );
    }

    const origin = req.headers.get('origin');
    if (origin) {
      let originUrl: URL;
      try {
        originUrl = new URL(origin);
      } catch {
        return NextResponse.json({ message: 'Submit the form from this website.' }, { status: 403, headers: securityHeaders });
      }
      const expectedHost =
        req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
      if (!['http:', 'https:'].includes(originUrl.protocol) || !expectedHost || originUrl.host !== expectedHost) {
        return NextResponse.json(
          { message: 'Submit the form from this website.' },
          { status: 403, headers: securityHeaders }
        );
      }
    }

    const now = Date.now();
    for (const [key, value] of limits) {
      if (now - value.start > 600000) limits.delete(key);
    }

    const forwarded = req.headers.get('x-forwarded-for');
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || 'local';
    const bucket = limits.get(ip) || { start: now, count: 0 };
    bucket.count++;
    limits.set(ip, bucket);

    if (bucket.count > 8) {
      const retryAfter = Math.ceil((600000 - now + bucket.start) / 1000);
      return NextResponse.json(
        { message: 'Too many attempts. Please wait a few minutes or email info@migrationfactor.com.' },
        {
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': String(retryAfter),
          },
        }
      );
    }

    const raw = await readBoundedBody(req);
    if (raw === null) {
      return NextResponse.json(
        { message: 'Your enquiry is too large. Please use fewer characters.' },
        { status: 413, headers: securityHeaders }
      );
    }

    let input: Record<string, unknown>;
    try {
      input = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { message: 'Invalid request. Please try again.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const { data, errors } = validateEnquiry(input);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: 'Please check the highlighted fields.', errors },
        { status: 422, headers: securityHeaders }
      );
    }

    const record = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name: data.name, email: data.email, phone: data.phone,
      service: data.service, message: data.message, consent: data.consent,
    };

    const rootDir = process.cwd();
    const dataDir =
      process.env.DATA_DIR ||
      (process.env.VERCEL
        ? path.join(os.tmpdir(), 'migrationfactor-data')
        : path.join(rootDir, 'data'));

    await saveEnquiry(dataDir, record);

    const webhook = process.env.ENQUIRY_WEBHOOK_URL || '';
    const token = process.env.ENQUIRY_WEBHOOK_TOKEN || '';
    const delivered = await forwardEnquiry(record, webhook, token);

    return NextResponse.json(
      {
        id: record.id,
        delivery: delivered ? 'forwarded' : 'local',
        message: delivered
          ? `Your enquiry has been saved and forwarded to the enquiry service. Reference: ${record.id.slice(0, 8)}.`
          : webhook
            ? `Your enquiry was saved, but forwarding failed. Please contact info@migrationfactor.com. Reference: ${record.id.slice(0, 8)}.`
            : `Your enquiry has been saved on this server. It has not been emailed to Migration Factor. Reference: ${record.id.slice(0, 8)}. For a direct response, email info@migrationfactor.com.`,
      },
      { status: 201, headers: securityHeaders }
    );
  } catch (error) {
    console.error('API request failed:', error instanceof Error ? error.name : 'UnknownError');
    return NextResponse.json(
      { message: 'The server could not complete your request. Please email info@migrationfactor.com.' },
      { status: 500, headers: securityHeaders }
    );
  }
}
