import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
import { CacheStats, CacheStatsCollector } from '../../infrastructure/cache/CacheStats';
import logger from '../../core/utils/logger';

export class CacheService {
  constructor(private readonly cacheProvider: ICacheProvider) {}

  async get(key: string): Promise<any> {
    try {
      return await this.cacheProvider.get(key);
    } catch (error) {
      logger.error(`Error getting cache value for key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await this.cacheProvider.set(key, value, ttl);
    } catch (error) {
      logger.error(`Error setting cache value for key ${key}:`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheProvider.del(key);
    } catch (error) {
      logger.error(`Error deleting cache value for key ${key}:`, error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return await this.cacheProvider.exists(key);
    } catch (error) {
      logger.error(`Error checking cache existence for key ${key}:`, error);
      return false;
    }
  }

  async flush(): Promise<void> {
    try {
      await this.cacheProvider.flush();
    } catch (error) {
      logger.error('Error flushing cache:', error);
    }
  }

  async getStats(): Promise<CacheStats> {
    try {
      const stats = await this.cacheProvider.getStats();
      return CacheStatsCollector.formatStats(stats, 'unknown');
    } catch (error) {
      logger.error('Error getting cache stats:', error);
      return {
        provider: 'unknown',
        hits: 0,
        misses: 0,
        hitRate: 0,
        keys: 0,
        maxSize: 0,
        timestamp: new Date(),
      };
    }
  }
}