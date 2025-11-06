"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidateCacheUseCase = void 0;
class InvalidateCacheUseCase {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async execute(pattern) {
        if (pattern) {
            await this.cacheService.flush();
        }
        else {
            await this.cacheService.flush();
        }
    }
}
exports.InvalidateCacheUseCase = InvalidateCacheUseCase;
//# sourceMappingURL=InvalidateCacheUseCase.js.map