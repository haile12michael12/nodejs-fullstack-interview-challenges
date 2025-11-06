import { CacheService } from '../services/CacheService';
import { CacheStats } from '../../infrastructure/cache/CacheStats';
export declare class GetCacheStatsUseCase {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    execute(): Promise<CacheStats>;
}
//# sourceMappingURL=GetCacheStatsUseCase.d.ts.map