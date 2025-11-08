const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  log: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.REQUEST_LOG_FORMAT || 'combined',
  },
};