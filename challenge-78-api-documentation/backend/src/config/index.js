const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  docs: {
    path: process.env.DOCS_PATH || '/docs',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};