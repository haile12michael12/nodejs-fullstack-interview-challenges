"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarmCacheUseCase = void 0;
class WarmCacheUseCase {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async execute(data) {
        for (const [key, value] of Object.entries(data)) {
            await this.cacheService.set(key, value);
        }
    }
}
exports.WarmCacheUseCase = WarmCacheUseCase;
//# sourceMappingURL=WarmCacheUseCase.js.map