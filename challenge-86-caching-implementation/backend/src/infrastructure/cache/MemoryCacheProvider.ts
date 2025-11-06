import { LRUCache } from 'lru-cache';
import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
import logger from '../../core/utils/logger';

export class MemoryCacheProvider implements ICacheProvider {
  private cache: LRUCache<string, any>;
  private hits: number = 0;
  private misses: number = 0;

  constructor(maxItems: number = 1000, ttl: number = 300) {
    this.cache = new LRUCache<string, any>({
      max: maxItems,
      ttl: ttl * 1000, // Convert to milliseconds
    });
    
    logger.info(`MemoryCacheProvider initialized with maxItems: ${maxItems}, ttl: ${ttl}s`);
  }

  async get(key: string): Promise<any> {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.hits++;
      logger.debug(`Cache HIT for key: ${key}`);
    } else {
      this.misses++;
      logger.debug(`Cache MISS for key: ${key}`);
    }
    return value;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const expiration = ttl ? ttl * 1000 : undefined;
    this.cache.set(key, value, { ttl: expiration });
    logger.debug(`Cache SET for key: ${key}`);
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
    logger.debug(`Cache DELETE for key: ${key}`);
  }

  async exists(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async flush(): Promise<void> {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
    logger.info('Memory cache flushed');
  }

  async getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      keys: this.cache.size,
      maxSize: this.cache.max,
    };
  }
}