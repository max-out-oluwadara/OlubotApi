import dotenv from 'dotenv';
dotenv.config();

import log from './config/log';
import { startServer, stopServer } from './server';
import config from './config/index'; // Correct import path
import initializeDB from './db/connection';

const initialize = async () => {
  try {
    const port = config.PORT;

    // Initialize the database connection before starting the server
    await initializeDB();

    const serverInstance = await startServer(port);

    process.on('SIGTERM', () => {
      log.info('SIGTERM signal received: closing HTTP server');
      stopServer(serverInstance);
    });

    process.on('SIGINT', () => {
      log.info('SIGINT signal received: closing HTTP server');
      stopServer(serverInstance);
    });
  } catch (error) {
    log.error(`Failed to initialize the server: ${error.message}`);
    process.exit(1);
  }
};

initialize();
