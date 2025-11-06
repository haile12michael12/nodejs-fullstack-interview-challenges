import { CacheService } from '../services/CacheService';
export declare class InvalidateCacheUseCase {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    execute(pattern?: string): Promise<void>;
}
//# sourceMappingURL=InvalidateCacheUseCase.d.ts.map