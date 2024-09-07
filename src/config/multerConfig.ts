import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { Request } from 'express'; // Import Request type from express

import config from './index';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME!,
  api_key: config.CLOUDINARY_API_KEY!,
  api_secret: config.CLOUDINARY_API_SECRET!,
});

// Correct the `params` type
interface CloudinaryParams {
  folder?: string | ((req: Request, file: Express.Multer.File) => string);
  format?: string | ((req: Request, file: Express.Multer.File) => string);
  public_id?: string | ((req: Request, file: Express.Multer.File) => string);
}

// Configure Multer storage with Cloudinary
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (_req: Request, file: Express.Multer.File): CloudinaryParams => ({
    folder: 'uploads',
    format: 'png',
    public_id: file.originalname,
  }),
});

const upload = multer({ storage: cloudinaryStorage });

export { cloudinary, upload }; // Export both cloudinary and upload
