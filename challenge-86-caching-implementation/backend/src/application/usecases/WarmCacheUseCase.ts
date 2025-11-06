import { CacheService } from '../services/CacheService';

export class WarmCacheUseCase {
  constructor(private readonly cacheService: CacheService) {}

  async execute(data: Record<string, any>): Promise<void> {
    // Warm the cache with provided data
    for (const [key, value] of Object.entries(data)) {
      await this.cacheService.set(key, value);
    }
  }
}