import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/index';
import { AuthRequest } from '../types/express';
import { Unauthorized, HttpError } from './error';

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new Unauthorized('Access denied, no token provided.'));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as AuthRequest['user'];
    next();
  } catch (ex) {
    next(new Unauthorized('Invalid token.'));
  }
};

export default authMiddleware;
