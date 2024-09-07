import dotenv from 'dotenv';

import log from '../config/log';
import { Config } from '../types/env.d.';
dotenv.config();

const environment = process.env.NODE_ENV;
log.info(`Loading configuration for environment: ${environment}`);

const config: Config = {
  MONGO_URI: process.env.MONGO_URI || 'default_mongo_uri',
  PORT: parseInt(process.env.PORT || '3000', 10),
  LOG_LEVEL: environment === 'production' ? 'info' : 'debug',
  RATE_LIMIT_WINDOW_MS: parseInt(
    process.env.RATE_LIMIT_WINDOW_MS || '60000',
    10,
  ), // Default to 60 seconds
  RATE_LIMIT_MAX_REQUESTS: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || '100',
    10,
  ),
  SWAGGER_API_DOCS_ROUTE: process.env.SWAGGER_API_DOCS_ROUTE || '/api-docs',
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
  SMTP_HOST: process.env.SMTP_HOST || 'localhost',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER || 'user@example.com',
  SMTP_PASS: process.env.SMTP_PASS || 'password',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

export default config;
