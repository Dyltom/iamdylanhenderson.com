# Email Setup Guide

The contact form sends email through [Resend](https://resend.com) from `src/utils/sendEmail.ts`.

## Required Environment Variables

Set these in `.env.local` (see `.env.local.example`):

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
TO_EMAIL=your-email@example.com
```

Without `TO_EMAIL`, messages go to Resend's `delivered@resend.dev` test inbox. Mail is sent from `onboarding@resend.dev` until a domain is verified in Resend.

## Optional: reCAPTCHA

The contact form supports Google reCAPTCHA v2:

1. Register a site at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) (add localhost for development)
2. Add the keys to `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```

## Behaviour

- Requests are validated: `name`, `email` and `message` are required, the email must look valid, and the message is limited to 5000 characters. Invalid requests get a 400 with an `error` message.
- The API allows 5 emails per 24 hours per IP address (in memory, so per server instance).
