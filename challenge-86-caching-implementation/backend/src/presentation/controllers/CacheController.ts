import { Request, Response } from 'express';
import { GetCacheStatsUseCase } from '../../application/usecases/GetCacheStatsUseCase';
import { InvalidateCacheUseCase } from '../../application/usecases/InvalidateCacheUseCase';
import { WarmCacheUseCase } from '../../application/usecases/WarmCacheUseCase';

export class CacheController {
  constructor(
    private readonly getCacheStatsUseCase: GetCacheStatsUseCase,
    private readonly invalidateCacheUseCase: InvalidateCacheUseCase,
    private readonly warmCacheUseCase: WarmCacheUseCase
  ) {}

  getStats = async (req: Request, res: Response) => {
    try {
      const stats = await this.getCacheStatsUseCase.execute();
      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get cache stats',
      });
    }
  };

  invalidate = async (req: Request, res: Response) => {
    try {
      const { pattern } = req.body;
      await this.invalidateCacheUseCase.execute(pattern);
      res.json({
        success: true,
        message: 'Cache invalidated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to invalidate cache',
      });
    }
  };

  warm = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      await this.warmCacheUseCase.execute(data);
      res.json({
        success: true,
        message: 'Cache warmed successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to warm cache',
      });
    }
  };
}