import { Config } from '../../types/env/types';

const productionConfig: Config = {
  MONGO_URI: process.env.MONGO_URI || 'your_production_mongo_uri',
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: 'info',
};

export default productionConfig;
