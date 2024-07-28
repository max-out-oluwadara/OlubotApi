import dotenv from 'dotenv';

import { Config } from '../../types/env/types';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
console.log(`Loading configuration for environment: ${environment}`);

const loadConfig = async (): Promise<Config> => {
  switch (environment) {
    case 'development':
      return (await import('./development')).default;
    case 'production':
      return (await import('./production')).default;
    case 'test':
      return (await import('./test')).default;
    default:
      throw new Error(
        `Configuration file for '${environment}' environment not found.`,
      );
  }
};

export default loadConfig;
