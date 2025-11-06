import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
import { MemoryCacheProvider } from './MemoryCacheProvider';
import { RedisCacheProvider } from './RedisCacheProvider';
import { createRedisClient } from '../../config/redis.config';
import logger from '../../core/utils/logger';

export class CacheFactory {
  private static instance: CacheFactory;
  private redisClient: any;

  private constructor() {}

  static getInstance(): CacheFactory {
    if (!CacheFactory.instance) {
      CacheFactory.instance = new CacheFactory();
    }
    return CacheFactory.instance;
  }

  async createCacheProvider(type: 'memory' | 'redis'): Promise<ICacheProvider> {
    switch (type) {
      case 'memory':
        return new MemoryCacheProvider(
          parseInt(process.env.CACHE_MAX_ITEMS || '1000', 10),
          parseInt(process.env.CACHE_TTL || '300', 10)
        );
      
      case 'redis':
        // Initialize Redis client if not already done
        if (!this.redisClient) {
          this.redisClient = createRedisClient();
          try {
            await this.redisClient.connect();
            logger.info('Connected to Redis');
          } catch (error) {
            logger.error('Failed to connect to Redis, falling back to memory cache:', error);
            return this.createCacheProvider('memory');
          }
        }
        
        return new RedisCacheProvider(this.redisClient);
      
      default:
        throw new Error(`Unsupported cache provider type: ${type}`);
    }
  }
}