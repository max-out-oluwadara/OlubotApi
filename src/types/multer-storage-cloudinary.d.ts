import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import type { Request } from 'express';

declare module 'multer-storage-cloudinary' {
  interface CloudinaryStorageParams {
    folder?: string;
    format?:
      | string
      | ((req: Request, file: Express.Multer.File) => string | undefined);
    public_id?:
      | string
      | ((req: Request, file: Express.Multer.File) => string | undefined);
    resource_type?: string;
    transformation?: UploadApiOptions['transformation'];
  }

  interface CloudinaryStorageOptions {
    cloudinary: typeof cloudinary;
    params: CloudinaryStorageParams;
  }

  class CloudinaryStorage {
    constructor(options: CloudinaryStorageOptions);
  }
}
