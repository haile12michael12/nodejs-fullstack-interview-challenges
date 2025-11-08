const { startServer } = require('./server');
const logger = require('../infrastructure/logging/logger');
const config = require('../config');

// Bootstrap the application
const bootstrap = async () => {
  try {
    logger.info('Starting application...');
    logger.info(`Environment: ${config.env}`);
    
    // Log masked configuration
    logger.debug('Configuration:', config);
    
    // Start the server
    await startServer();
    
    logger.info('Application started successfully');
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
};

// Run the application
if (require.main === module) {
  bootstrap();
}

module.exports = { bootstrap };