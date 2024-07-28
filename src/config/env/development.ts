import { Config } from '../../types/env/types';

const developmentConfig: Config = {
  MONGO_URI: process.env.MONGO_URI || 'your_development_mongo_uri',
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: 'debug',
};

export default developmentConfig;
