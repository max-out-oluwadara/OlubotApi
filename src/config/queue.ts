import Bull, { Job } from 'bull';

import config from './index'; // Importing the config from config/index.ts
import { sendEmail } from '../utils/mailTemplateSender'; // Function to send emails
import logs from './log'; // Logger for logging information and errors
import { EmailContext } from '../types/mail';

// Interface defining the structure of email data
interface EmailData {
  to: string;
  templateName: string;
  context: EmailContext;
}

// Retry settings for the email queue
const retries = 3;
const delay = 1000 * 60 * 5; // 5 minutes delay

// Redis configuration details
const redisConfig = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  // password: config.REDIS_PASSWORD, // Uncomment if password is needed
};

// Creating a new Bull queue named "Email"
const emailQueue = new Bull('Email', {
  redis: redisConfig,
});

// Function to add an email job to the queue
const addEmailToQueue = async (data: EmailData) => {
  await emailQueue.add(data, {
    attempts: retries, // Number of retry attempts
    backoff: {
      type: 'fixed',
      delay,
    },
  });
};

// Processing email jobs from the queue
emailQueue.process(async (job: Job, done) => {
  try {
    const { to, templateName, context } = job.data;
    await sendEmail(to, templateName, context);
    job.log('Email sent successfully to ' + to);
    logs.info('Email sent successfully');
  } catch (error) {
    logs.error('Error sending email:', error);
    throw error;
  } finally {
    done();
  }
});

// Event listeners for job completion and failure
emailQueue.on('completed', (job: Job) => {
  logs.info(`Job with id ${job.id} has been completed`);
});

emailQueue.on('failed', (job: Job, error: Error) => {
  logs.error(`Job with id ${job.id} has failed with error: ${error.message}`);
});

// Exporting the queue and addEmailToQueue function for use in other parts of the application
export { emailQueue, addEmailToQueue };
