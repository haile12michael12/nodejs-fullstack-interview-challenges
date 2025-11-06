import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
import { CacheStats } from '../../infrastructure/cache/CacheStats';
export declare class CacheService {
    private readonly cacheProvider;
    constructor(cacheProvider: ICacheProvider);
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    flush(): Promise<void>;
    getStats(): Promise<CacheStats>;
}
//# sourceMappingURL=CacheService.d.ts.map