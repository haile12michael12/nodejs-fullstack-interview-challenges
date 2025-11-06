import { CacheService } from '../../application/services/CacheService';
import logger from '../../core/utils/logger';

export class CacheWarmService {
  constructor(private readonly cacheService: CacheService) {}

  async warmCacheWithData(data: Record<string, any>): Promise<void> {
    logger.info(`Warming cache with ${Object.keys(data).length} entries`);
    
    for (const [key, value] of Object.entries(data)) {
      await this.cacheService.set(key, value);
    }
    
    logger.info('Cache warming completed');
  }

  async warmCacheWithFetcher(
    keys: string[],
    dataFetcher: (key: string) => Promise<any>
  ): Promise<void> {
    logger.info(`Warming cache with ${keys.length} keys`);
    
    for (const key of keys) {
      try {
        const data = await dataFetcher(key);
        if (data !== null && data !== undefined) {
          await this.cacheService.set(key, data);
        }
      } catch (error) {
        logger.error(`Error warming cache for key ${key}:`, error);
      }
    }
    
    logger.info('Cache warming completed');
  }
}