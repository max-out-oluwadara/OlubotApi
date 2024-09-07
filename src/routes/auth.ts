import { Router, Request, Response, NextFunction } from 'express';

import { User } from '../models/user.model';
import { EmailContext } from '../types/mail';
import { SignUpRequest } from '../types/auth';
import { queueEmail } from '../utils/mailTemplateSender'; // Changed sendEmail to queueEmail
import {
  hashPassword,
  compareUserPassword,
  generateToken,
} from '../utils/index';
import { BadRequest, Unauthorized } from '../middleware/error';

const authRoute = Router();

// Sign Up
authRoute.post(
  '/signup',
  async (
    req: Request<object, object, SignUpRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequest('User already exists with this email');
      }

      // Hash the password and save the user
      const hashedPassword = await hashPassword(password);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      // Generate a token
      // const token = generateToken({ _id: user._id });
      // res.header('Authorization', `Bearer ${token}`).send({ token });

      // Queue welcome email
      const context: EmailContext = {
        name,
        subject: 'Welcome to [Your Company Name]!',
      }; // Include subject in context
      await queueEmail(email, 'signup-email', context);

      // Generate a token
      const token = generateToken({ _id: user._id });
      res.header('Authorization', `Bearer ${token}`).json({
        success: true,
        message: 'User registered successfully',
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
);

// Sign In
authRoute.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Unauthorized('Invalid email or password');
      }

      // Compare the password
      const isMatch = await compareUserPassword(password, user.password);
      if (!isMatch) {
        throw new Unauthorized('Invalid email or password');
      }

      // Generate a token
      // const token = generateToken({ _id: user._id });
      // res.header('Authorization', `Bearer ${token}`).send({ token });

      const token = generateToken({ _id: user._id });
      res.header('Authorization', `Bearer ${token}`).json({
        success: true,
        message: 'User logged in successfully',
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
);

export { authRoute };
