import { Request, Response } from 'express';
import { GetCacheStatsUseCase } from '../../application/usecases/GetCacheStatsUseCase';
import { InvalidateCacheUseCase } from '../../application/usecases/InvalidateCacheUseCase';
import { WarmCacheUseCase } from '../../application/usecases/WarmCacheUseCase';
export declare class CacheController {
    private readonly getCacheStatsUseCase;
    private readonly invalidateCacheUseCase;
    private readonly warmCacheUseCase;
    constructor(getCacheStatsUseCase: GetCacheStatsUseCase, invalidateCacheUseCase: InvalidateCacheUseCase, warmCacheUseCase: WarmCacheUseCase);
    getStats: (req: Request, res: Response) => Promise<void>;
    invalidate: (req: Request, res: Response) => Promise<void>;
    warm: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=CacheController.d.ts.map