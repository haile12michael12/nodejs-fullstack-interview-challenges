"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheProvider = void 0;
const logger_1 = __importDefault(require("../../core/utils/logger"));
class RedisCacheProvider {
    constructor(redisClient) {
        this.redisClient = redisClient;
        this.hits = 0;
        this.misses = 0;
    }
    async get(key) {
        try {
            const value = await this.redisClient.get(key);
            if (value !== null) {
                this.hits++;
                logger_1.default.debug(`Redis Cache HIT for key: ${key}`);
                return JSON.parse(value);
            }
            else {
                this.misses++;
                logger_1.default.debug(`Redis Cache MISS for key: ${key}`);
                return null;
            }
        }
        catch (error) {
            logger_1.default.error(`Error getting value from Redis for key ${key}:`, error);
            return null;
        }
    }
    async set(key, value, ttl) {
        try {
            const stringValue = JSON.stringify(value);
            if (ttl) {
                await this.redisClient.setEx(key, ttl, stringValue);
            }
            else {
                await this.redisClient.set(key, stringValue);
            }
            logger_1.default.debug(`Redis Cache SET for key: ${key}`);
        }
        catch (error) {
            logger_1.default.error(`Error setting value in Redis for key ${key}:`, error);
        }
    }
    async del(key) {
        try {
            await this.redisClient.del(key);
            logger_1.default.debug(`Redis Cache DELETE for key: ${key}`);
        }
        catch (error) {
            logger_1.default.error(`Error deleting value from Redis for key ${key}:`, error);
        }
    }
    async exists(key) {
        try {
            const result = await this.redisClient.exists(key);
            return result > 0;
        }
        catch (error) {
            logger_1.default.error(`Error checking existence in Redis for key ${key}:`, error);
            return false;
        }
    }
    async flush() {
        try {
            await this.redisClient.flushAll();
            this.hits = 0;
            this.misses = 0;
            logger_1.default.info('Redis cache flushed');
        }
        catch (error) {
            logger_1.default.error('Error flushing Redis cache:', error);
        }
    }
    async getStats() {
        try {
            const info = await this.redisClient.info();
            const lines = info.split('\n');
            let keyspaceHits = 0;
            let keyspaceMisses = 0;
            for (const line of lines) {
                if (line.startsWith('keyspace_hits:')) {
                    keyspaceHits = parseInt(line.split(':')[1], 10);
                }
                else if (line.startsWith('keyspace_misses:')) {
                    keyspaceMisses = parseInt(line.split(':')[1], 10);
                }
            }
            return {
                hits: this.hits + keyspaceHits,
                misses: this.misses + keyspaceMisses,
                keys: 0,
                maxSize: 0,
            };
        }
        catch (error) {
            logger_1.default.error('Error getting Redis stats:', error);
            return {
                hits: this.hits,
                misses: this.misses,
                keys: 0,
                maxSize: 0,
            };
        }
    }
}
exports.RedisCacheProvider = RedisCacheProvider;
//# sourceMappingURL=RedisCacheProvider.js.map