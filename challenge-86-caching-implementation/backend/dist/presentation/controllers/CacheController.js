"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheController = void 0;
class CacheController {
    constructor(getCacheStatsUseCase, invalidateCacheUseCase, warmCacheUseCase) {
        this.getCacheStatsUseCase = getCacheStatsUseCase;
        this.invalidateCacheUseCase = invalidateCacheUseCase;
        this.warmCacheUseCase = warmCacheUseCase;
        this.getStats = async (req, res) => {
            try {
                const stats = await this.getCacheStatsUseCase.execute();
                res.json({
                    success: true,
                    data: stats,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Failed to get cache stats',
                });
            }
        };
        this.invalidate = async (req, res) => {
            try {
                const { pattern } = req.body;
                await this.invalidateCacheUseCase.execute(pattern);
                res.json({
                    success: true,
                    message: 'Cache invalidated successfully',
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Failed to invalidate cache',
                });
            }
        };
        this.warm = async (req, res) => {
            try {
                const { data } = req.body;
                await this.warmCacheUseCase.execute(data);
                res.json({
                    success: true,
                    message: 'Cache warmed successfully',
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Failed to warm cache',
                });
            }
        };
    }
}
exports.CacheController = CacheController;
//# sourceMappingURL=CacheController.js.map