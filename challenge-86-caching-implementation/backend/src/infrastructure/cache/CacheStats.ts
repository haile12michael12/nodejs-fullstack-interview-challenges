export interface CacheStats {
  provider: string;
  hits: number;
  misses: number;
  hitRate: number;
  keys: number;
  maxSize: number;
  timestamp: Date;
}

export class CacheStatsCollector {
  static calculateHitRate(hits: number, misses: number): number {
    const total = hits + misses;
    return total > 0 ? (hits / total) * 100 : 0;
  }

  static formatStats(stats: any, provider: string): CacheStats {
    const hitRate = this.calculateHitRate(stats.hits, stats.misses);
    
    return {
      provider,
      hits: stats.hits,
      misses: stats.misses,
      hitRate: parseFloat(hitRate.toFixed(2)),
      keys: stats.keys,
      maxSize: stats.maxSize,
      timestamp: new Date(),
    };
  }
}