import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '300', 10),
    maxItems: parseInt(process.env.CACHE_MAX_ITEMS || '1000', 10),
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
};