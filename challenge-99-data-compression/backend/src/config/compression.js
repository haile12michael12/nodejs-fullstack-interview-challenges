const env = require('./env');

const compressionConfig = {
  level: parseInt(env.COMPRESSION_LEVEL, 10) || 6,
  threshold: parseInt(env.COMPRESSION_THRESHOLD, 10) || 1024,
  filter: (req, res) => {
    // Don't compress responses with this request header
    if (req.headers['x-no-compression']) {
      return false;
    }
    
    // Use compression filter function
    return compression.filter(req, res);
  }
};

module.exports = compressionConfig;