const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  export: {
    maxRecords: parseInt(process.env.EXPORT_MAX_RECORDS || '10000', 10),
    formats: (process.env.EXPORT_FORMATS || 'csv,json,excel').split(','),
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
};