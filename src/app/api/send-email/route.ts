import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import sendEmail from '../../../utils/sendEmail';
import {
  parseContactMessage,
  readJsonBody,
} from '../../../utils/apiValidation';

const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of requests
  duration: 86400, // Per 24 hours by IP
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '';
    await rateLimiter.consume(ip);
  } catch (rateLimiterError) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const parsed = parseContactMessage(await readJsonBody(req));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await sendEmail(parsed.data);
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'Error sending email',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
