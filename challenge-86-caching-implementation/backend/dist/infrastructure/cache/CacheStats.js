"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStatsCollector = void 0;
class CacheStatsCollector {
    static calculateHitRate(hits, misses) {
        const total = hits + misses;
        return total > 0 ? (hits / total) * 100 : 0;
    }
    static formatStats(stats, provider) {
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
exports.CacheStatsCollector = CacheStatsCollector;
//# sourceMappingURL=CacheStats.js.map