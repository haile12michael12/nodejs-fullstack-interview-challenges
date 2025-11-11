// Environment config loader
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 50051,
  nodeEnv: process.env.NODE_ENV || 'development'
};