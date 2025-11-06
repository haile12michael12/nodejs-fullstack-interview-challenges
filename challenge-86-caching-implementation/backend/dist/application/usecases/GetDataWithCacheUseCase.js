"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataWithCacheUseCase = void 0;
class GetDataWithCacheUseCase {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async execute(key, dataFetcher, ttl) {
        let data = await this.cacheService.get(key);
        if (data === null || data === undefined) {
            data = await dataFetcher();
            if (data !== null && data !== undefined) {
                await this.cacheService.set(key, data, ttl);
            }
        }
        return data;
    }
}
exports.GetDataWithCacheUseCase = GetDataWithCacheUseCase;
//# sourceMappingURL=GetDataWithCacheUseCase.js.map