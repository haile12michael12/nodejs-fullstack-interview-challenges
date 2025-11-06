import { CacheService } from '../services/CacheService';
import { CacheStats } from '../../infrastructure/cache/CacheStats';

export class GetCacheStatsUseCase {
  constructor(private readonly cacheService: CacheService) {}

  async execute(): Promise<CacheStats> {
    return await this.cacheService.getStats();
  }
}