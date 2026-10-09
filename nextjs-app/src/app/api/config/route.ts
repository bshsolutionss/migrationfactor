import { NextResponse } from 'next/server';

export async function GET() {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL || '';
  return NextResponse.json(
    { deliveryConfigured: Boolean(webhook) },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    }
  );
}
