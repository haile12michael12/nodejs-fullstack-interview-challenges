// Optional helper for writing logs
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logCounter = 0;
    this.logTypes = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    this.logMessages = [
      'User login successful',
      'Database connection established',
      'Cache miss for key: user:123',
      'API request processed in 45ms',
      'File upload completed',
      'Memory usage: 75%',
      'Background job started',
      'Email sent successfully',
      'Invalid token provided',
      'Rate limit exceeded',
      'Configuration reloaded',
      'Session expired'
    ];
    
    // Ensure logs directory exists
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    this.logFilePath = path.join(logsDir, 'app.log');
  }

  generateRandomLog() {
    const timestamp = new Date().toISOString();
    const type = this.logTypes[Math.floor(Math.random() * this.logTypes.length)];
    const message = this.logMessages[Math.floor(Math.random() * this.logMessages.length)];
    const id = ++this.logCounter;
    
    return {
      id,
      timestamp,
      type,
      message,
      level: type === 'ERROR' ? 'error' : type === 'WARN' ? 'warn' : 'info'
    };
  }

  logToFile(logEntry) {
    const logLine = `[${logEntry.timestamp}] ${logEntry.type}: ${logEntry.message}\n`;
    fs.appendFileSync(this.logFilePath, logLine);
  }

  getLogCounter() {
    return this.logCounter;
  }

  resetLogCounter() {
    this.logCounter = 0;
  }
}

module.exports = { Logger };