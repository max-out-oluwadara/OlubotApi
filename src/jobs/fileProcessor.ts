import { Job } from 'bull';

import { File } from '../models/file.model';
import { io } from '../config/socket';

export const processFileJob = async (job: Job) => {
  const { fileId, filename, user, imageUrl } = job.data;

  try {
    // Simulate file processing
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Update file status in the database
    const file = await File.findById(fileId);
    if (file) {
      file.status = 'completed';
      await file.save();
    }

    // Notify the user via Socket.IO
    io.emit(`fileStatus:${user}`, { fileId, status: 'completed', imageUrl });
  } catch (error) {
    // Handle errors and update status
    const file = await File.findById(fileId);
    if (file) {
      file.status = 'failed';
      await file.save();
    }

    io.emit(`fileStatus:${user}`, { fileId, status: 'failed' });
    throw error;
  }
};
