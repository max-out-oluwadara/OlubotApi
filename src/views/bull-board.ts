import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import Bull from 'bull';

const emailQueue = new Bull('email');
const notificationQueue = new Bull('notification');
const smsQueue = new Bull('sms');

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [
    new BullAdapter(emailQueue),
    new BullAdapter(notificationQueue),
    new BullAdapter(smsQueue),
  ],
  serverAdapter,
});

serverAdapter.setBasePath('/admin/queues');

export default serverAdapter;
