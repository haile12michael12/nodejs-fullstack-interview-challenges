const deprecationManager = require('../utils/deprecationManager');

const versioningMiddleware = (req, res, next) => {
  // Extract version from Accept header
  const acceptHeader = req.get('Accept') || '';
  const versionMatch = acceptHeader.match(/version=(v\d+)/);
  
  if (versionMatch) {
    req.apiVersion = versionMatch[1];
  }
  
  // Extract version from URL path
  const urlVersionMatch = req.path.match(/^\/api\/(v\d+)/);
  if (urlVersionMatch) {
    req.apiVersion = urlVersionMatch[1];
  }
  
  // Default to v1 if no version specified
  if (!req.apiVersion) {
    req.apiVersion = 'v1';
  }
  
  // Check if version is deprecated
  if (deprecationManager.isDeprecated(req.apiVersion)) {
    const deprecationDate = deprecationManager.getDeprecationDate(req.apiVersion);
    res.set('Warning', `299 - "${req.apiVersion} API is deprecated, please migrate to a newer version. Deprecation date: ${deprecationDate}"`);
  }
  
  next();
};

module.exports = versioningMiddleware;