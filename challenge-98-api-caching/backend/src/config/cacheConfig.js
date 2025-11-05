require('dotenv').config();

const cacheConfig = {
  ttl: parseInt(process.env.CACHE_TTL) || 300, // 5 minutes default
  maxItems: parseInt(process.env.CACHE_MAX_ITEMS) || 1000,
  etagEnabled: process.env.CACHE_ETAG_ENABLED === 'true' || true,
  cacheControl: process.env.CACHE_CONTROL || 'public, max-age=300'
};

module.exports = cacheConfig;