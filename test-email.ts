import 'dotenv/config';
import nodemailer from 'nodemailer';

async function test() {
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // TLS will be used automatically
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: 'Test Email',
      text: 'This is a test message from portfolio.',
    });
    console.log('Email sent:', info);
  } catch (err) {
    console.error('Email error:', err);
  }
}

test();
