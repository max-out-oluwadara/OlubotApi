import express, { Express, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import log from './config/log';
import { Server } from 'http';
import limiter from './config/limiter';
import { swaggerUi, specs } from './swagger';
import 'dotenv/config';
import { routeNotFound, errorHandler } from './middleware/error';

const server: Express = express();

const port = process.env.PORT || 3000;

const corsOptions: CorsOptions = {
  origin: "*", // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS", "PATCH"], // Allow these HTTP methods
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Authorization'
  ], // Allow these headers
  credentials: false, // Allow cookies and other credentials
  optionsSuccessStatus: 204 // Response status for preflight requests
};

// Use the CORS middleware with the specified options
server.use(cors(corsOptions));
server.use(limiter);

// Setup Swagger
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Home route
server.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Conditionally use Bull in non-test environments
if (process.env.NODE_ENV !== 'test') {
  const ServerAdapter = require('./views/bull-board').default;
  server.use('/admin/queues', ServerAdapter.getRouter());
}

// Middleware for handling 404 - Not Found
server.use(routeNotFound);

// Middleware for handling errors
server.use(errorHandler);

let serverInstance: Server;

if (require.main === module) {
  serverInstance = server.listen(port, () => {
    log.info(`App listening at port ${port}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    log.info('SIGTERM signal received: closing HTTP server');
    serverInstance.close(() => {
      log.info('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    log.info('SIGINT signal received: closing HTTP server');
    serverInstance.close(() => {
      log.info('HTTP server closed');
    });
  });
}

export const startServer = () => {
  serverInstance = server.listen(port, () => {
    log.info(`App listening at port ${port}`);
  });
  return serverInstance;
};

export const stopServer = () => {
  if (serverInstance) {
    serverInstance.close();
  }
};

export default server;
