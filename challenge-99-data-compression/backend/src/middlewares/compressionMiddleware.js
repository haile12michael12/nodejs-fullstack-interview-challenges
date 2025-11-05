const compression = require('compression');
const { compressionConfig } = require('../config');

const compressionMiddleware = compression(compressionConfig);

// Custom compression logging
const compressionLogger = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    // Log compression stats
    if (req.headers['accept-encoding'] && res.getHeader('content-encoding')) {
      console.log(`Compressed response for ${req.url}: ${res.getHeader('content-encoding')}`);
    }
    originalSend.call(this, data);
  };
  next();
};

module.exports = [compressionMiddleware, compressionLogger];