import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  filename: string;
  status: string;
  user: string;
  imageUrl: string; // Add this field to store the image URL
  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema<IFile>({
  filename: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
  user: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Add this field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const File = mongoose.model<IFile>('File', fileSchema);

export { File };
