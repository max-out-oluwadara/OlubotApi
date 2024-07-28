import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: '*', // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Allow these HTTP methods
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Authorization',
  ], // Allow these headers
  credentials: false, // Allow cookies and other credentials
  optionsSuccessStatus: 204, // Response status for preflight requests
};

export default corsOptions;
