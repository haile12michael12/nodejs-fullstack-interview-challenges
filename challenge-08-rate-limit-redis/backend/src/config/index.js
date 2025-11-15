const config = {
  port: process.env.PORT || 3001, // Changed from 3000 to 3001
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
    tokenBucket: {
      capacity: parseInt(process.env.TOKEN_BUCKET_CAPACITY) || 10,
      refillRate: parseInt(process.env.TOKEN_BUCKET_REFILL_RATE) || 1, // tokens per second
    }
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization']
  }
};

module.exports = config;