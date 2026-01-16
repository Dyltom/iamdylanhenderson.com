// src/utils/sendEmail.ts
import { Resend } from 'resend';

interface EmailRequestBody {
  name: string;
  email: string;
  message: string;
}

export default async (body: EmailRequestBody) => {
  // Check for required environment variable
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      'Email configuration missing. Please set RESEND_API_KEY in .env.local'
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use Resend's test email for now
      to: process.env.TO_EMAIL || 'delivered@resend.dev', // Your email or test email
      subject: `[Dylan Henderson's Website] New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; margin: 10px 0;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error sending email');
  }
};