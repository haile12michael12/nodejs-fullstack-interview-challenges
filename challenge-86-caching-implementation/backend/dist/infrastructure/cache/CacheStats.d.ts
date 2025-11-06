export interface CacheStats {
    provider: string;
    hits: number;
    misses: number;
    hitRate: number;
    keys: number;
    maxSize: number;
    timestamp: Date;
}
export declare class CacheStatsCollector {
    static calculateHitRate(hits: number, misses: number): number;
    static formatStats(stats: any, provider: string): CacheStats;
}
//# sourceMappingURL=CacheStats.d.ts.map