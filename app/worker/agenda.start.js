// agenda.start.js
import agenda from '../helper/agenda.js';
import '../jobs/email.job.js';

(async function () {
  await agenda.start();
  console.log('Agenda started 🚀');
})();
