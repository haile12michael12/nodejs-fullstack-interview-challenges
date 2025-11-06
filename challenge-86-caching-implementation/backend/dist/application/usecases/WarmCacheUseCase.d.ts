import { CacheService } from '../services/CacheService';
export declare class WarmCacheUseCase {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    execute(data: Record<string, any>): Promise<void>;
}
//# sourceMappingURL=WarmCacheUseCase.d.ts.map