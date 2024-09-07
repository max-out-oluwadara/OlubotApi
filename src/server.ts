import { Server } from 'http'; // Import the correct Server type

import app from './app';
import log from './config/log';

let serverInstance: Server;

const startServer = async (port: number | string): Promise<Server> => {
  try {
    serverInstance = app.listen(port, () => {
      log.info(`Server running on port ${port}`);
    });
    return serverInstance;
  } catch (error) {
    if (error instanceof Error) {
      log.error(`Failed to start the server: ${error.message}`);
    }
    process.exit(1);
  }
};

const stopServer = async (server: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          log.error(`Failed to close the server: ${err.message}`);
          return reject(err);
        }
        log.info('HTTP server closed');
        resolve();
      });
    } else {
      resolve();
    }
  });
};

export { startServer, stopServer };
