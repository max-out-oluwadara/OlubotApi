import { Config } from '../../types/env/types';

const testConfig: Config = {
  MONGO_URI: process.env.MONGO_URI || 'your_test_mongo_uri',
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: 'debug',
};

export default testConfig;
