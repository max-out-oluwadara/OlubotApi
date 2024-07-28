import mongoose from 'mongoose';

import log from './log';
import loadConfig from './env';

const connectDB = async () => {
  try {
    const config = await loadConfig();
    await mongoose.connect(config.MONGO_URI, {});

    mongoose.connection.on('connected', () => {
      log.info('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      log.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      log.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      log.info('MongoDB reconnected');
    });

    log.info(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    log.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
