import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/dist/src/queueAdapters/bull';

import { emailQueue } from '../config/queue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter,
});

export default serverAdapter;
