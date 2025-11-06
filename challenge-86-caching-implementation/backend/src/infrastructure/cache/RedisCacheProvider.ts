import { RedisClientType } from 'redis';
import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
import logger from '../../core/utils/logger';

export class RedisCacheProvider implements ICacheProvider {
  private hits: number = 0;
  private misses: number = 0;

  constructor(private readonly redisClient: RedisClientType) {}

  async get(key: string): Promise<any> {
    try {
      const value = await this.redisClient.get(key);
      if (value !== null) {
        this.hits++;
        logger.debug(`Redis Cache HIT for key: ${key}`);
        return JSON.parse(value);
      } else {
        this.misses++;
        logger.debug(`Redis Cache MISS for key: ${key}`);
        return null;
      }
    } catch (error) {
      logger.error(`Error getting value from Redis for key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      if (ttl) {
        await this.redisClient.setEx(key, ttl, stringValue);
      } else {
        await this.redisClient.set(key, stringValue);
      }
      logger.debug(`Redis Cache SET for key: ${key}`);
    } catch (error) {
      logger.error(`Error setting value in Redis for key ${key}:`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
      logger.debug(`Redis Cache DELETE for key: ${key}`);
    } catch (error) {
      logger.error(`Error deleting value from Redis for key ${key}:`, error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redisClient.exists(key);
      return result > 0;
    } catch (error) {
      logger.error(`Error checking existence in Redis for key ${key}:`, error);
      return false;
    }
  }

  async flush(): Promise<void> {
    try {
      await this.redisClient.flushAll();
      this.hits = 0;
      this.misses = 0;
      logger.info('Redis cache flushed');
    } catch (error) {
      logger.error('Error flushing Redis cache:', error);
    }
  }

  async getStats() {
    try {
      const info = await this.redisClient.info();
      // Parse Redis info to extract relevant stats
      const lines = info.split('\n');
      let keyspaceHits = 0;
      let keyspaceMisses = 0;
      
      for (const line of lines) {
        if (line.startsWith('keyspace_hits:')) {
          keyspaceHits = parseInt(line.split(':')[1], 10);
        } else if (line.startsWith('keyspace_misses:')) {
          keyspaceMisses = parseInt(line.split(':')[1], 10);
        }
      }
      
      return {
        hits: this.hits + keyspaceHits,
        misses: this.misses + keyspaceMisses,
        keys: 0, // Would need to parse DB info for actual key count
        maxSize: 0, // Redis doesn't have a fixed max size
      };
    } catch (error) {
      logger.error('Error getting Redis stats:', error);
      return {
        hits: this.hits,
        misses: this.misses,
        keys: 0,
        maxSize: 0,
      };
    }
  }
}