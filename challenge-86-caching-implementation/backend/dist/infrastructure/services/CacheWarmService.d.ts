import { CacheService } from '../../application/services/CacheService';
export declare class CacheWarmService {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    warmCacheWithData(data: Record<string, any>): Promise<void>;
    warmCacheWithFetcher(keys: string[], dataFetcher: (key: string) => Promise<any>): Promise<void>;
}
//# sourceMappingURL=CacheWarmService.d.ts.map