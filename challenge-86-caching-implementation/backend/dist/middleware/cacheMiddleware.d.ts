import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../application/services/CacheService';
export declare class CacheMiddleware {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    cache: (ttl?: number) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    private generateCacheKey;
}
//# sourceMappingURL=cacheMiddleware.d.ts.map