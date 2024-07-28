import connectDB from '../config/db';
import log from '../config/log';

const initializeDB = async () => {
  try {
    await connectDB();
    log.info('Database successfully connected.');
  } catch (error) {
    log.error('Failed to connect to the database.', error);
  }
};

export default initializeDB;
