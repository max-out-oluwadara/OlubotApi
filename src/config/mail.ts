import nodemailer from 'nodemailer';

import config from './index'; // Importing the config from config/index.ts

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  const mailOptions = {
    from: config.SMTP_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
