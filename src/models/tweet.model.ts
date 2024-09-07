import { Schema, model, Document } from 'mongoose';

interface ITweet extends Document {
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TweetSchema = new Schema<ITweet>(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Tweet = model<ITweet>('Tweet', TweetSchema);
