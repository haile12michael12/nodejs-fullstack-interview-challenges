"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const CacheStats_1 = require("../../infrastructure/cache/CacheStats");
const logger_1 = __importDefault(require("../../core/utils/logger"));
class CacheService {
    constructor(cacheProvider) {
        this.cacheProvider = cacheProvider;
    }
    async get(key) {
        try {
            return await this.cacheProvider.get(key);
        }
        catch (error) {
            logger_1.default.error(`Error getting cache value for key ${key}:`, error);
            return null;
        }
    }
    async set(key, value, ttl) {
        try {
            await this.cacheProvider.set(key, value, ttl);
        }
        catch (error) {
            logger_1.default.error(`Error setting cache value for key ${key}:`, error);
        }
    }
    async del(key) {
        try {
            await this.cacheProvider.del(key);
        }
        catch (error) {
            logger_1.default.error(`Error deleting cache value for key ${key}:`, error);
        }
    }
    async exists(key) {
        try {
            return await this.cacheProvider.exists(key);
        }
        catch (error) {
            logger_1.default.error(`Error checking cache existence for key ${key}:`, error);
            return false;
        }
    }
    async flush() {
        try {
            await this.cacheProvider.flush();
        }
        catch (error) {
            logger_1.default.error('Error flushing cache:', error);
        }
    }
    async getStats() {
        try {
            const stats = await this.cacheProvider.getStats();
            return CacheStats_1.CacheStatsCollector.formatStats(stats, 'unknown');
        }
        catch (error) {
            logger_1.default.error('Error getting cache stats:', error);
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
exports.CacheService = CacheService;
//# sourceMappingURL=CacheService.js.map