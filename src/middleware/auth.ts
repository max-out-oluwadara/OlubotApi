import { NextFunction } from 'express'; // Only import what's needed

import { verifyToken } from '../utils/index';
import { AuthRequest } from '../types/express';
import { Unauthorized } from './error'; // Keep only the necessary error class

const authMiddleware = (
  req: AuthRequest,
  _res: unknown,
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
