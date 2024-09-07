// src/config/index.ts
import dotenv from 'dotenv';

import log from '../config/log';
import { Config } from '../types/env.d.'; // Adjusted import path

dotenv.config();

const environment = process.env.NODE_ENV;
log.info(`Loading configuration for environment: ${environment}`);

const config: Config = {
  MONGO_URI: process.env.MONGO_URI || 'default_mongo_uri',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  LOG_LEVEL: environment === 'production' ? 'info' : 'debug',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
  SWAGGER_API_DOCS_ROUTE: process.env.SWAGGER_API_DOCS_ROUTE,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default config;
