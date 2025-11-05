require('dotenv').config();

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  COMPRESSION_LEVEL: process.env.COMPRESSION_LEVEL || 6,
  COMPRESSION_THRESHOLD: process.env.COMPRESSION_THRESHOLD || 1024,
};

module.exports = env;