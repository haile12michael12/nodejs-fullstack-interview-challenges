const dotenv = require('dotenv');
const { connectToBroker } = require('./broker');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3002;

// Connect to message broker
connectToBroker()
  .then(() => {
    logger.info(`Email service started on port ${PORT}`);
  })
  .catch((error) => {
    logger.error('Failed to start email service:', error);
    process.exit(1);
  });