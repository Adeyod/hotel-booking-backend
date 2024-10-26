import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailType } from '../constants/types';

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_SECURE,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
} as SMTPTransport.Options);

const sendVerificationMail = async ({
  link,
  first_name,
  userEmail,
}: EmailType) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: userEmail,
      subject: 'Email verification',
      html: `Hello ${first_name}, Please click the link below to verify your email address and if you do not register on our platform ignore this message. ${link}`,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { sendVerificationMail };
