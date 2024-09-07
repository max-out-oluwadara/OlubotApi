import { Schema, model, Document } from 'mongoose';

interface IResponse extends Document {
  mentionId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResponseSchema = new Schema<IResponse>(
  {
    mentionId: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Response = model<IResponse>('Response', ResponseSchema);
