import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    // Add other user properties as needed
  };
}
