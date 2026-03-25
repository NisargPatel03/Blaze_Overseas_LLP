import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, category, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const logoPath = path.join(process.cwd(), 'public', 'logo.jpg');

    const { getContactEmailHtml } = await import('@/lib/emailTemplates');

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `New Contact Inquiry from ${firstName} ${lastName}`,
      replyTo: email,
      attachments: [{
        filename: 'logo.jpg',
        path: logoPath,
        cid: 'blazze_logo'
      }],
      html: getContactEmailHtml({
        name: `${firstName} ${lastName}`.trim(),
        email: email || '',
        interest: category || '',
        message: message || ''
      }),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
