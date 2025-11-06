export interface ICacheProvider {
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
//# sourceMappingURL=ICacheProvider.d.ts.map