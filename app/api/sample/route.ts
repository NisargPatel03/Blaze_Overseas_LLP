import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, category, product, packing, packets, remarks } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const logoPath = path.join(process.cwd(), 'public', 'logo.jpg');

    const { getSampleEmailHtml } = await import('@/lib/emailTemplates');

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `New Sample Request from ${name}`,
      replyTo: email,
      attachments: [{
        filename: 'logo.jpg',
        path: logoPath,
        cid: 'blazze_logo'
      }],
      html: getSampleEmailHtml({
        name: name || '',
        email: email || '',
        phone: phone || '',
        category: category || '',
        product: product || '',
        packing: packing || '',
        packets: packets || '',
        remarks: remarks || ''
      }),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending sample request email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
