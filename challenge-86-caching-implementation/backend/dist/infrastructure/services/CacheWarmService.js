"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheWarmService = void 0;
const logger_1 = __importDefault(require("../../core/utils/logger"));
class CacheWarmService {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async warmCacheWithData(data) {
        logger_1.default.info(`Warming cache with ${Object.keys(data).length} entries`);
        for (const [key, value] of Object.entries(data)) {
            await this.cacheService.set(key, value);
        }
        logger_1.default.info('Cache warming completed');
    }
    async warmCacheWithFetcher(keys, dataFetcher) {
        logger_1.default.info(`Warming cache with ${keys.length} keys`);
        for (const key of keys) {
            try {
                const data = await dataFetcher(key);
                if (data !== null && data !== undefined) {
                    await this.cacheService.set(key, data);
                }
            }
            catch (error) {
                logger_1.default.error(`Error warming cache for key ${key}:`, error);
            }
        }
        logger_1.default.info('Cache warming completed');
    }
}
exports.CacheWarmService = CacheWarmService;
//# sourceMappingURL=CacheWarmService.js.map