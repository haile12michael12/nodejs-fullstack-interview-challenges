import { CacheService } from '../services/CacheService';

export class GetDataWithCacheUseCase {
  constructor(private readonly cacheService: CacheService) {}

  async execute<T>(
    key: string,
    dataFetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    // Try to get data from cache first
    let data = await this.cacheService.get(key);
    
    if (data === null || data === undefined) {
      // If not in cache, fetch the data
      data = await dataFetcher();
      
      // Store in cache for future requests
      if (data !== null && data !== undefined) {
        await this.cacheService.set(key, data, ttl);
      }
    }
    
    return data;
  }
}