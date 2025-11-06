import request from 'supertest';
import app from '../../app';

// Mock the cache initialization
jest.mock('../../infrastructure/cache/CacheFactory');

describe('Cache Endpoints', () => {
  describe('GET /api/cache/stats', () => {
    it('should return cache statistics', async () => {
      const response = await request(app)
        .get('/api/cache/stats')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('POST /api/cache/invalidate', () => {
    it('should invalidate cache entries', async () => {
      const response = await request(app)
        .post('/api/cache/invalidate')
        .send({ pattern: 'test*' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/cache/warm', () => {
    it('should warm cache with provided data', async () => {
      const warmData = {
        'key1': 'value1',
        'key2': { name: 'test', value: 123 }
      };

      const response = await request(app)
        .post('/api/cache/warm')
        .send({ data: warmData })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});