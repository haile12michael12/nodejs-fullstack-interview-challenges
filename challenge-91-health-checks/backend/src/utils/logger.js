const fs = require('fs').promises;
const path = require('path');

class Logger {
  static levels = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
  };

  static async log(level, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data
    };

    console.log(JSON.stringify(logEntry));

    // In a real implementation, we would also write to a file
    // try {
    //   const logDir = path.join(__dirname, '..', '..', 'logs');
    //   await fs.mkdir(logDir, { recursive: true });
    //   const logFile = path.join(logDir, `${level}.log`);
    //   await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
    // } catch (error) {
    //   console.error('Failed to write to log file:', error);
    // }
  }

  static error(message, data = {}) {
    this.log(this.levels.ERROR, message, data);
  }

  static warn(message, data = {}) {
    this.log(this.levels.WARN, message, data);
  }

  static info(message, data = {}) {
    this.log(this.levels.INFO, message, data);
  }

  static debug(message, data = {}) {
    this.log(this.levels.DEBUG, message, data);
  }
}

module.exports = Logger;