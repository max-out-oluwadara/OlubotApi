import rateLimit from 'express-rate-limit';

import config from './index'; // Importing the config from config/index.ts

const windowMs = config.RATE_LIMIT_WINDOW_MS || 60000; // default to 60 seconds
const maxRequests = config.RATE_LIMIT_MAX_REQUESTS || 100; // default to 100 requests

const limiter = rateLimit({
  windowMs: windowMs,
  max: maxRequests,
  message: 'Too many requests from this IP, please try again after a minute',
});

export default limiter;
