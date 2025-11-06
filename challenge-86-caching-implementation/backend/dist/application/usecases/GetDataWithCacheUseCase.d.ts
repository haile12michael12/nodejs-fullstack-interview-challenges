import { CacheService } from '../services/CacheService';
export declare class GetDataWithCacheUseCase {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    execute<T>(key: string, dataFetcher: () => Promise<T>, ttl?: number): Promise<T>;
}
//# sourceMappingURL=GetDataWithCacheUseCase.d.ts.map