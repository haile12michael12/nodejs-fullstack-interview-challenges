"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCacheProvider = void 0;
const lru_cache_1 = require("lru-cache");
const logger_1 = __importDefault(require("../../core/utils/logger"));
class MemoryCacheProvider {
    constructor(maxItems = 1000, ttl = 300) {
        this.hits = 0;
        this.misses = 0;
        this.cache = new lru_cache_1.LRUCache({
            max: maxItems,
            ttl: ttl * 1000,
        });
        logger_1.default.info(`MemoryCacheProvider initialized with maxItems: ${maxItems}, ttl: ${ttl}s`);
    }
    async get(key) {
        const value = this.cache.get(key);
        if (value !== undefined) {
            this.hits++;
            logger_1.default.debug(`Cache HIT for key: ${key}`);
        }
        else {
            this.misses++;
            logger_1.default.debug(`Cache MISS for key: ${key}`);
        }
        return value;
    }
    async set(key, value, ttl) {
        const expiration = ttl ? ttl * 1000 : undefined;
        this.cache.set(key, value, { ttl: expiration });
        logger_1.default.debug(`Cache SET for key: ${key}`);
    }
    async del(key) {
        this.cache.delete(key);
        logger_1.default.debug(`Cache DELETE for key: ${key}`);
    }
    async exists(key) {
        return this.cache.has(key);
    }
    async flush() {
        this.cache.clear();
        this.hits = 0;
        this.misses = 0;
        logger_1.default.info('Memory cache flushed');
    }
    async getStats() {
        return {
            hits: this.hits,
            misses: this.misses,
            keys: this.cache.size,
            maxSize: this.cache.max,
        };
    }
}
exports.MemoryCacheProvider = MemoryCacheProvider;
//# sourceMappingURL=MemoryCacheProvider.js.map