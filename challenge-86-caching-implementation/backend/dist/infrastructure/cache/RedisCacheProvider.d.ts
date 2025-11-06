import { RedisClientType } from 'redis';
import { ICacheProvider } from '../../core/interfaces/ICacheProvider';
export declare class RedisCacheProvider implements ICacheProvider {
    private readonly redisClient;
    private hits;
    private misses;
    constructor(redisClient: RedisClientType);
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
//# sourceMappingURL=RedisCacheProvider.d.ts.map