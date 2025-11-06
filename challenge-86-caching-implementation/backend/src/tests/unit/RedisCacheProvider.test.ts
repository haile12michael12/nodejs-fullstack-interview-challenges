import { RedisCacheProvider } from '../../infrastructure/cache/RedisCacheProvider';

// Mock the redis client
const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
  setEx: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
  flushAll: jest.fn(),
  info: jest.fn(),
};

jest.mock('../../core/utils/logger');

describe('RedisCacheProvider', () => {
  let cacheProvider: RedisCacheProvider;

  beforeEach(() => {
    cacheProvider = new RedisCacheProvider(mockRedisClient as any);
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should get a value from redis and parse it', async () => {
      const key = 'test-key';
      const value = { name: 'test', value: 123 };
      mockRedisClient.get.mockResolvedValue(JSON.stringify(value));

      const result = await cacheProvider.get(key);

      expect(mockRedisClient.get).toHaveBeenCalledWith(key);
      expect(result).toEqual(value);
    });

    it('should return null for non-existent keys', async () => {
      const key = 'non-existent-key';
      mockRedisClient.get.mockResolvedValue(null);

      const result = await cacheProvider.get(key);

      expect(result).toBeNull();
    });

    it('should handle redis errors gracefully', async () => {
      const key = 'test-key';
      mockRedisClient.get.mockRejectedValue(new Error('Redis error'));

      const result = await cacheProvider.get(key);

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set a value in redis with ttl', async () => {
      const key = 'test-key';
      const value = { name: 'test', value: 123 };
      const ttl = 300;

      await cacheProvider.set(key, value, ttl);

      expect(mockRedisClient.setEx).toHaveBeenCalledWith(
        key,
        ttl,
        JSON.stringify(value)
      );
    });

    it('should set a value in redis without ttl', async () => {
      const key = 'test-key';
      const value = { name: 'test', value: 123 };

      await cacheProvider.set(key, value);

      expect(mockRedisClient.set).toHaveBeenCalledWith(
        key,
        JSON.stringify(value)
      );
    });
  });

  describe('del', () => {
    it('should delete a key from redis', async () => {
      const key = 'test-key';

      await cacheProvider.del(key);

      expect(mockRedisClient.del).toHaveBeenCalledWith(key);
    });
  });

  describe('exists', () => {
    it('should return true for existing keys', async () => {
      const key = 'test-key';
      mockRedisClient.exists.mockResolvedValue(1);

      const result = await cacheProvider.exists(key);

      expect(result).toBe(true);
    });

    it('should return false for non-existing keys', async () => {
      const key = 'non-existent-key';
      mockRedisClient.exists.mockResolvedValue(0);

      const result = await cacheProvider.exists(key);

      expect(result).toBe(false);
    });
  });

  describe('flush', () => {
    it('should flush all keys from redis', async () => {
      await cacheProvider.flush();

      expect(mockRedisClient.flushAll).toHaveBeenCalled();
    });
  });
});