require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  health: {
    checkInterval: process.env.HEALTH_CHECK_INTERVAL || 30000,
    timeout: process.env.HEALTH_CHECK_TIMEOUT || 5000,
    dependencies: {
      database: process.env.DB_HEALTH_CHECK !== 'false',
      redis: process.env.REDIS_HEALTH_CHECK !== 'false',
      externalAPIs: process.env.EXTERNAL_API_HEALTH_CHECK !== 'false'
    }
  },
  services: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      name: process.env.DB_NAME || 'healthcheck_db'
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    }
  }
};

module.exports = config;