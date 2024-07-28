import app from './app';
import log from './config/log';

let serverInstance: ReturnType<typeof app.listen>;

const startServer = async (port: number | string) => {
  try {
    serverInstance = app.listen(port, () => {
      log.info(`Server running on port ${port}`);
    });

    return serverInstance;
  } catch (error) {
    log.error(`Failed to start the server: ${error.message}`);
    process.exit(1);
  }
};

const stopServer = (server: ReturnType<typeof app.listen>) => {
  if (server) {
    server.close(() => {
      log.info('HTTP server closed');
    });
  }
};

export { startServer, stopServer };
