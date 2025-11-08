const morgan = require('morgan');
const { requestLogger } = require('../config/logger.config');

// Custom Morgan format that logs to our Winston logger
const requestLoggerMiddleware = morgan((tokens, req, res) => {
  const logData = {
    requestId: req.id,
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens['response-time'](req, res),
    userAgent: tokens['user-agent'](req, res),
    ip: tokens['remote-addr'](req, res),
    httpVersion: tokens['http-version'](req, res),
    contentLength: tokens.res(req, res, 'content-length'),
  };

  // Log the request data
  requestLogger.info('HTTP Request', logData);
  
  // Return empty string since we're handling the logging ourselves
  return '';
});

module.exports = requestLoggerMiddleware;