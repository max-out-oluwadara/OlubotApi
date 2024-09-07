import { Router } from 'express';

import { upload, cloudinary } from '../config/multerConfig'; // Import the upload middleware from your configuration
import { File } from '../models/file.model'; // Import the File model

const fileRoute = Router();

fileRoute.get('/upload', (_req, res) => {
  console.log('hello');
  res.send('hello');
});

fileRoute.post('/upload', upload.single('image'), async (req, res) => {
  const { user } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${Date.now()}_${req.file.originalname}`,
    });

    // Save the file information to the database
    const newFile = new File({
      filename: req.file.originalname,
      user,
      status: 'completed',
      imageUrl: uploadResult.secure_url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newFile.save();

    return res
      .status(201)
      .json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    return res.status(500).json({
      error: 'Error uploading file',
      details: (error as Error).message,
    });
  }
});

export { fileRoute };
