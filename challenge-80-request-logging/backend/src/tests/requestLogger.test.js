const request = require('supertest');
const app = require('../app');

describe('Request Logging', () => {
  // Test that requests are logged
  describe('Request Logging Middleware', () => {
    it('should log requests with request ID', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.headers).toHaveProperty('x-request-id');
    });

    it('should include response time in headers', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(res.headers).toHaveProperty('x-response-time');
    });

    it('should handle custom request ID', async () => {
      const customId = 'test-request-id-123';
      const res = await request(app)
        .get('/api/health')
        .set('X-Request-ID', customId)
        .expect(200);
      
      expect(res.headers['x-request-id']).toBe(customId);
    });
  });

  // Test 404 logging
  describe('404 Handling', () => {
    it('should log 404 errors', async () => {
      const res = await request(app)
        .get('/api/non-existent-endpoint')
        .expect(404);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Route not found');
    });
  });

  // Test health endpoint
  describe('Health Endpoint', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Server is running');
    });
  });
});