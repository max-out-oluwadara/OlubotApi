import Bull from 'bull';
import dotenv from 'dotenv';

import { processFileJob } from '../jobs/fileProcessor';

dotenv.config();

const fileProcessingQueue = new Bull('fileProcessingQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

fileProcessingQueue.process(processFileJob);

export { fileProcessingQueue };
