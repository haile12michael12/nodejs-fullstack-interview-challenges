"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheFactory = void 0;
const MemoryCacheProvider_1 = require("./MemoryCacheProvider");
const RedisCacheProvider_1 = require("./RedisCacheProvider");
const redis_config_1 = require("../../config/redis.config");
const logger_1 = __importDefault(require("../../core/utils/logger"));
class CacheFactory {
    constructor() { }
    static getInstance() {
        if (!CacheFactory.instance) {
            CacheFactory.instance = new CacheFactory();
        }
        return CacheFactory.instance;
    }
    async createCacheProvider(type) {
        switch (type) {
            case 'memory':
                return new MemoryCacheProvider_1.MemoryCacheProvider(parseInt(process.env.CACHE_MAX_ITEMS || '1000', 10), parseInt(process.env.CACHE_TTL || '300', 10));
            case 'redis':
                if (!this.redisClient) {
                    this.redisClient = (0, redis_config_1.createRedisClient)();
                    try {
                        await this.redisClient.connect();
                        logger_1.default.info('Connected to Redis');
                    }
                    catch (error) {
                        logger_1.default.error('Failed to connect to Redis, falling back to memory cache:', error);
                        return this.createCacheProvider('memory');
                    }
                }
                return new RedisCacheProvider_1.RedisCacheProvider(this.redisClient);
            default:
                throw new Error(`Unsupported cache provider type: ${type}`);
        }
    }
}
exports.CacheFactory = CacheFactory;
//# sourceMappingURL=CacheFactory.js.map