import { Request, Response } from 'express';

import { fileProcessingQueue } from '../utils/fileProcessingQueue';
import { File } from '../models/file.model';

export const uploadFile = async (req: Request, res: Response) => {
  const { user } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.file;

  try {
    const newFile = new File({
      filename: file.originalname,
      user,
      status: 'pending',
      imageUrl: file.path, // Cloudinary provides the URL in the `path` attribute
    });
    await newFile.save();

    await fileProcessingQueue.add({
      fileId: newFile._id,
      filename: file.originalname,
      user,
      imageUrl: file.path,
    });

    return res
      .status(201)
      .json({ message: 'File uploaded and processing started', file: newFile });
  } catch (error) {
    return res.status(500).json({ message: 'Error uploading file', error });
  }
};
