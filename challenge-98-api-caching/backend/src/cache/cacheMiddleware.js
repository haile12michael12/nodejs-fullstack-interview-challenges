const crypto = require('crypto');
const { get, set } = require('./cacheStore');
const { generateETag } = require('./etagUtils');
const { cache } = require('../config');

const cacheMiddleware = (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  // Generate cache key from URL and query parameters
  const cacheKey = crypto.createHash('md5').update(req.originalUrl).digest('hex');
  
  // Check if response is cached
  const cachedResponse = get(cacheKey);
  
  if (cachedResponse) {
    // Check ETag if enabled
    if (cache.etagEnabled) {
      const etag = generateETag(cachedResponse.data);
      res.set('ETag', etag);
      
      // Check if client has valid ETag
      if (req.headers['if-none-match'] === etag) {
        return res.status(304).end(); // Not Modified
      }
    }
    
    // Return cached response
    res.set('Content-Type', 'application/json');
    res.set('Cache-Control', cache.cacheControl);
    return res.status(200).json(cachedResponse.data);
  }
  
  // Override res.send to cache the response
  const originalSend = res.send;
  res.send = function(data) {
    // Cache the response
    set(cacheKey, { data, timestamp: Date.now() });
    
    // Add ETag if enabled
    if (cache.etagEnabled) {
      const etag = generateETag(data);
      res.set('ETag', etag);
    }
    
    res.set('Cache-Control', cache.cacheControl);
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = cacheMiddleware;