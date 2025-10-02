const config = require('../config');

class TokenBucketRateLimiter {
  constructor(redisClient) {
    this.redis = redisClient;
    this.capacity = config.rateLimit.tokenBucket.capacity;
    this.refillRate = config.rateLimit.tokenBucket.refillRate;
    this.windowMs = config.rateLimit.windowMs;
  }

  async checkLimit(identifier) {
    const now = Date.now();
    const bucketKey = `rate_limit:${identifier}`;
    
    try {
      // Get current bucket state
      const bucketData = await this.redis.get(bucketKey);
      
      if (!bucketData) {
        // Initialize bucket with full capacity
        const newBucket = {
          tokens: this.capacity,
          lastRefill: now
        };
        await this.redis.setex(bucketKey, Math.ceil(this.windowMs / 1000), JSON.stringify(newBucket));
        return { allowed: true, remaining: this.capacity - 1, resetTime: now + this.windowMs };
      }

      const bucket = JSON.parse(bucketData);
      const timePassed = now - bucket.lastRefill;
      
      // Calculate tokens to add based on time passed
      const tokensToAdd = Math.floor(timePassed / 1000) * this.refillRate;
      const newTokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
      
      if (newTokens >= 1) {
        // Allow request and consume token
        const updatedBucket = {
          tokens: newTokens - 1,
          lastRefill: now
        };
        await this.redis.setex(bucketKey, Math.ceil(this.windowMs / 1000), JSON.stringify(updatedBucket));
        return { 
          allowed: true, 
          remaining: updatedBucket.tokens, 
          resetTime: now + this.windowMs 
        };
      } else {
        // Rate limit exceeded
        const timeUntilNextToken = Math.ceil((1 - newTokens) / this.refillRate * 1000);
        return { 
          allowed: false, 
          remaining: 0, 
          resetTime: now + timeUntilNextToken,
          retryAfter: Math.ceil(timeUntilNextToken / 1000)
        };
      }
    } catch (error) {
      console.error('Rate limiter error:', error);
      // Fail open - allow request if Redis is down
      return { allowed: true, remaining: this.capacity - 1, resetTime: now + this.windowMs };
    }
  }

  async getRateLimitInfo(identifier) {
    const bucketKey = `rate_limit:${identifier}`;
    
    try {
      const bucketData = await this.redis.get(bucketKey);
      
      if (!bucketData) {
        return {
          limit: this.capacity,
          remaining: this.capacity,
          resetTime: Date.now() + this.windowMs
        };
      }

      const bucket = JSON.parse(bucketData);
      const now = Date.now();
      const timePassed = now - bucket.lastRefill;
      const tokensToAdd = Math.floor(timePassed / 1000) * this.refillRate;
      const currentTokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);

      return {
        limit: this.capacity,
        remaining: currentTokens,
        resetTime: bucket.lastRefill + this.windowMs
      };
    } catch (error) {
      console.error('Rate limit info error:', error);
      return {
        limit: this.capacity,
        remaining: this.capacity,
        resetTime: Date.now() + this.windowMs
      };
    }
  }
}

function createRateLimitMiddleware(rateLimiter) {
  return async (req, res, next) => {
    // Get client identifier (IP address or API key)
    const identifier = req.headers['x-api-key'] || 
                     req.connection.remoteAddress || 
                     req.headers['x-forwarded-for'] || 
                     'anonymous';

    const result = await rateLimiter.checkLimit(identifier);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', rateLimiter.capacity);
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    res.setHeader('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    if (!result.allowed) {
      res.setHeader('Retry-After', result.retryAfter);
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: result.retryAfter,
        limit: rateLimiter.capacity,
        remaining: 0,
        resetTime: new Date(result.resetTime).toISOString()
      }));
      return;
    }

    if (next) next();
  };
}

module.exports = {
  TokenBucketRateLimiter,
  createRateLimitMiddleware
};



