"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryCacheProvider_1 = require("../../infrastructure/cache/MemoryCacheProvider");
jest.mock('../../core/utils/logger');
describe('MemoryCacheProvider', () => {
    let cacheProvider;
    beforeEach(() => {
        cacheProvider = new MemoryCacheProvider_1.MemoryCacheProvider(100, 300);
    });
    afterEach(async () => {
        await cacheProvider.flush();
    });
    describe('set and get', () => {
        it('should set and get a value', async () => {
            const key = 'test-key';
            const value = { name: 'test', value: 123 };
            await cacheProvider.set(key, value);
            const result = await cacheProvider.get(key);
            expect(result).toEqual(value);
        });
        it('should return null for non-existent keys', async () => {
            const result = await cacheProvider.get('non-existent-key');
            expect(result).toBeUndefined();
        });
    });
    describe('del', () => {
        it('should delete a key', async () => {
            const key = 'test-key';
            await cacheProvider.set(key, 'test-value');
            await cacheProvider.del(key);
            const result = await cacheProvider.get(key);
            expect(result).toBeUndefined();
        });
    });
    describe('exists', () => {
        it('should return true for existing keys', async () => {
            const key = 'test-key';
            await cacheProvider.set(key, 'test-value');
            const result = await cacheProvider.exists(key);
            expect(result).toBe(true);
        });
        it('should return false for non-existing keys', async () => {
            const result = await cacheProvider.exists('non-existent-key');
            expect(result).toBe(false);
        });
    });
    describe('flush', () => {
        it('should clear all keys', async () => {
            await cacheProvider.set('key1', 'value1');
            await cacheProvider.set('key2', 'value2');
            await cacheProvider.flush();
            const result1 = await cacheProvider.get('key1');
            const result2 = await cacheProvider.get('key2');
            expect(result1).toBeUndefined();
            expect(result2).toBeUndefined();
        });
    });
    describe('getStats', () => {
        it('should return correct stats', async () => {
            let stats = await cacheProvider.getStats();
            expect(stats.hits).toBe(0);
            expect(stats.misses).toBe(0);
            expect(stats.keys).toBe(0);
            await cacheProvider.get('non-existent-key');
            stats = await cacheProvider.getStats();
            expect(stats.misses).toBe(1);
            await cacheProvider.set('test-key', 'test-value');
            await cacheProvider.get('test-key');
            stats = await cacheProvider.getStats();
            expect(stats.hits).toBe(1);
            expect(stats.keys).toBe(1);
        });
    });
});
//# sourceMappingURL=MemoryCacheProvider.test.js.map