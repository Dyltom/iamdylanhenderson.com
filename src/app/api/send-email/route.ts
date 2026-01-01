import { RateLimiterMemory } from 'rate-limiter-flexible';
import sendEmail from '../../../utils/sendEmail';

const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of requests
  duration: 86400, // Per 24 hours by IP
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '';
    await rateLimiter.consume(ip);
  } catch (rateLimiterError) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const body = await req.json();
    await sendEmail(body);
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error sending email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
