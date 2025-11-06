"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMiddleware = void 0;
class CacheMiddleware {
    constructor(cacheService) {
        this.cacheService = cacheService;
        this.cache = (ttl) => {
            return async (req, res, next) => {
                const key = this.generateCacheKey(req);
                const cachedResponse = await this.cacheService.get(key);
                if (cachedResponse) {
                    return res.json(cachedResponse);
                }
                const originalJson = res.json;
                res.json = (body) => {
                    this.cacheService.set(key, body, ttl);
                    return originalJson.call(res, body);
                };
                next();
                return;
            };
        };
    }
    generateCacheKey(req) {
        return `cache:${req.method}:${req.originalUrl}:${JSON.stringify(req.query)}`;
    }
}
exports.CacheMiddleware = CacheMiddleware;
//# sourceMappingURL=cacheMiddleware.js.map