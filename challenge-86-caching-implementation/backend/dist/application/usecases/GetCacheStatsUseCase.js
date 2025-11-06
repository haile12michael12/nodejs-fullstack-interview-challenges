"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCacheStatsUseCase = void 0;
class GetCacheStatsUseCase {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async execute() {
        return await this.cacheService.getStats();
    }
}
exports.GetCacheStatsUseCase = GetCacheStatsUseCase;
//# sourceMappingURL=GetCacheStatsUseCase.js.map