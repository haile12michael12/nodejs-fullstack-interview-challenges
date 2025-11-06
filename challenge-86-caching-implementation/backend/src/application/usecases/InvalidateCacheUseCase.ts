import { CacheService } from '../services/CacheService';

export class InvalidateCacheUseCase {
  constructor(private readonly cacheService: CacheService) {}

  async execute(pattern?: string): Promise<void> {
    if (pattern) {
      // In a real implementation, we would match keys by pattern
      // For now, we'll just flush everything
      await this.cacheService.flush();
    } else {
      await this.cacheService.flush();
    }
  }
}