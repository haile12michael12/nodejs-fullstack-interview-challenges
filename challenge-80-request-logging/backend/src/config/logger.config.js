const winston = require('winston');
const { format, transports } = winston;
const { combine, timestamp, printf, json, colorize } = format;
const env = require('./env');

// Custom log format
const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

// Create logger instance
const logger = winston.createLogger({
  level: env.log.level,
  format: combine(
    timestamp(),
    env.log.format === 'json' ? json() : customFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        customFormat
      )
    }),
    new transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new transports.File({ 
      filename: 'logs/combined.log' 
    }),
    new transports.File({ 
      filename: 'logs/request.log',
      level: 'info',
      format: combine(
        timestamp(),
        json()
      )
    })
  ]
});

// Create request logger instance
const requestLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ 
      filename: 'logs/http.log'
    })
  ]
});

module.exports = {
  logger,
  requestLogger
};