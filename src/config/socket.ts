import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

import log from './log';
import corsOptions from './corsOprions'; // Import the existing CORS options

let io: SocketIOServer;

const createSocketServer = (server: http.Server) => {
  io = new SocketIOServer(server, {
    cors: corsOptions, // Use the existing CORS options
  });

  io.on('connection', (socket) => {
    log.info(`A user connected: ${socket.id}`);
    socket.on('disconnect', () => {
      log.warn(`A user disconnected: ${socket.id}`);
    });
  });

  return io;
};

export { createSocketServer, io };
