import { Schema, model, Document } from 'mongoose';

interface IMention extends Document {
  tweetId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MentionSchema = new Schema<IMention>(
  {
    tweetId: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Mention = model<IMention>('Mention', MentionSchema);
