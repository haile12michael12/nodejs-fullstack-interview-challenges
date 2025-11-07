const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  search: {
    minLength: parseInt(process.env.SEARCH_MIN_LENGTH || '3', 10),
    maxResults: parseInt(process.env.SEARCH_MAX_RESULTS || '100', 10),
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'search_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
};