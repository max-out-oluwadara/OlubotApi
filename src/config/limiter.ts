import rateLimit from 'express-rate-limit';

const windowMs = process.env.RATE_LIMIT_WINDOW_MS
  ? parseInt(process.env.RATE_LIMIT_WINDOW_MS)
  : 60000; // default to 60 seconds

const maxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 100; // default to 100 requests

const limiter = rateLimit({
  windowMs: windowMs,
  max: maxRequests,
  message: 'Too many requests from this IP, please try again after a minute',
});

export default limiter;
