import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const compareUserPassword = (
  userPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(userPassword, hashedPassword);
};

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload | string;
};
