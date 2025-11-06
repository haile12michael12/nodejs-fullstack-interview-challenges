import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
export declare class MemoryCacheProvider implements ICacheProvider {
    private cache;
    private hits;
    private misses;
    constructor(maxItems?: number, ttl?: number);
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    flush(): Promise<void>;
    getStats(): Promise<{
        hits: number;
        misses: number;
        keys: number;
        maxSize: number;
    }>;
}
//# sourceMappingURL=MemoryCacheProvider.d.ts.map