const fs = require('fs').promises;
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', '..', 'logs', 'app.log');

// Ensure logs directory exists
(async () => {
  try {
    const logDir = path.dirname(LOG_FILE);
    await fs.access(logDir);
  } catch {
    await fs.mkdir(logDir, { recursive: true });
  }
})();

const logger = {
  info: (message, data = {}) => {
    const logEntry = {
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...data
    };
    console.log(JSON.stringify(logEntry));
    // In a real implementation, we would also write to a file
  },
  
  error: (message, data = {}) => {
    const logEntry = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      ...data
    };
    console.error(JSON.stringify(logEntry));
    // In a real implementation, we would also write to a file
  },
  
  warn: (message, data = {}) => {
    const logEntry = {
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...data
    };
    console.warn(JSON.stringify(logEntry));
    // In a real implementation, we would also write to a file
  }
};

module.exports = logger;