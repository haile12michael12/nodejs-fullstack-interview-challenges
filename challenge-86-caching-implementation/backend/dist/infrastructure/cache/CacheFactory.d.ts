import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
export declare class CacheFactory {
    private static instance;
    private redisClient;
    private constructor();
    static getInstance(): CacheFactory;
    createCacheProvider(type: 'memory' | 'redis'): Promise<ICacheProvider>;
}
//# sourceMappingURL=CacheFactory.d.ts.map