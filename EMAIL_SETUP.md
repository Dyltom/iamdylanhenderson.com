# Email Setup Guide

The contact form on this website uses Gmail with Nodemailer to send emails. Here's how to set it up:

## Required Environment Variables

You need to set these in your `.env.local` file:

```env
GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

## How to Get a Gmail App Password

1. **Enable 2-Factor Authentication**
   - Go to your [Google Account settings](https://myaccount.google.com/)
   - Navigate to Security
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - In Security settings, go to "2-Step Verification"
   - Scroll down and click on "App passwords"
   - Select "Mail" from the dropdown
   - Select your device
   - Click "Generate"
   - Copy the 16-character password

3. **Add to .env.local**
   - Create a `.env.local` file if it doesn't exist
   - Add your Gmail email and the app password
   - Example:
   ```env
   GMAIL_EMAIL=dylan@example.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```

## Optional: ReCAPTCHA Setup

The contact form also supports Google ReCAPTCHA to prevent spam. To enable it:

1. Go to [Google ReCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site (choose reCAPTCHA v2)
3. Add your domain (and localhost for development)
4. Copy the Site Key
5. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
   ```

## Testing

1. Make sure your dev server is running: `npm run dev`
2. Navigate to `/contact`
3. Fill out the form and submit
4. Check your Gmail inbox for the test email

## Troubleshooting

- **"Error sending email"**: Check that your environment variables are set correctly
- **Rate limiting**: The API allows 5 emails per 24 hours per IP address
- **Gmail blocking**: Make sure "Less secure app access" is not needed (app passwords bypass this)