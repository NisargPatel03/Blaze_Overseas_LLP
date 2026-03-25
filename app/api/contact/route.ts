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
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #fcfcfc;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; margin: 20px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                <!-- Header -->
                <tr>
                    <td style="background-color: #000000; padding: 40px 20px; text-align: center;">
                        <img src="cid:blazze_logo" alt="Blazze Overseas LLP" style="width: 120px; height: auto; border-radius: 12px; margin-bottom: 24px;" />
                        <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0; letter-spacing: 2px; text-transform: uppercase;">Contact Inquiry</h1>
                        <div style="width: 40px; height: 3px; background-color: #f59e0b; margin: 20px auto 0;"></div>
                    </td>
                </tr>
                
                <!-- Content -->
                <tr>
                    <td style="padding: 40px 30px;">
                        <!-- Section 1 -->
                        <h2 style="color: #f59e0b; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px;">Sender Information</h2>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 40px;">
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f9fafb; width: 35%; color: #6b7280; font-size: 14px;">Name</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f9fafb; color: #111827; font-size: 15px; font-weight: 500;">${firstName} ${lastName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f9fafb; width: 35%; color: #6b7280; font-size: 14px;">Email</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f9fafb; color: #111827; font-size: 15px;"><a href="mailto:${email}" style="color: #f59e0b; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; width: 35%; color: #6b7280; font-size: 14px;">Interest</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 15px;"><span style="background-color: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 13px;">${category || 'None selected'}</span></td>
                            </tr>
                        </table>

                        <!-- Section 2 -->
                        <h2 style="color: #f59e0b; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px;">Message</h2>
                        <div style="background-color: #f9fafb; padding: 24px; border-radius: 12px; color: #4b5563; font-size: 15px; line-height: 1.6; border-left: 4px solid #f59e0b; white-space: pre-wrap;">${message || '<span style="color: #9ca3af; font-style: italic;">No additional message provided.</span>'}</div>
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="background-color: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #f3f4f6;">
                        <p style="margin: 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Blazze Overseas LLP • Internal Automated System</p>
                        <p style="margin: 10px 0 0; color: #d1d5db; font-size: 11px;">This email was generated securely from the website forms.</p>
                    </td>
                </tr>
            </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
