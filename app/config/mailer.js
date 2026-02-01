import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "917d95868f0462",
    pass: "7a426853820dc5",
  },
});

export default mailer;