const helmet = require('helmet');
const { loadConfig } = require('./config');

const config = loadConfig();

// Create Helmet middleware with custom configuration
const securityMiddleware = helmet({
  contentSecurityPolicy: config.helmet.contentSecurityPolicy,
  hsts: config.helmet.hsts,
  frameguard: config.helmet.frameguard,
  referrerPolicy: config.helmet.referrerPolicy,
  dnsPrefetchControl: config.helmet.dnsPrefetchControl,
  hidePoweredBy: config.helmet.hidePoweredBy,
  ieNoOpen: config.helmet.ieNoOpen,
  noSniff: config.helmet.noSniff,
  xssFilter: config.helmet.xssFilter
});

module.exports = securityMiddleware;