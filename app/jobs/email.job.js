// jobs/email.job.js
import agenda from '../helper/agenda.js';
import ejs from 'ejs';
import mailer from '../config/mailer.js';

agenda.define('send welcome email', async job => {
  const { email, name } = job.attrs.data;

  const html = await ejs.renderFile(
    '../../views/email/welcome.ejs',
    { name }
  );

  await mailer.sendMail({
    to: email,
    subject: 'Welcome 🎉',
    html
  });
});
