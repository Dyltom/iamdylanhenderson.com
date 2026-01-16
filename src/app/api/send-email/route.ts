import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import sendEmail from '../../../utils/sendEmail';

const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of requests
  duration: 86400, // Per 24 hours by IP
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '';
    await rateLimiter.consume(ip);
  } catch (rateLimiterError) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    await sendEmail(body);
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: 'Error sending email',
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
