const request = require('supertest');
const app = require('../core/app');

describe('CORS Security', () => {
  // Test CORS headers
  describe('CORS Headers', () => {
    it('should include CORS headers in response', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.headers).toHaveProperty('access-control-allow-origin');
    });

    it('should handle preflight requests', async () => {
      const res = await request(app)
        .options('/health')
        .set('Origin', 'http://localhost:3001')
        .set('Access-Control-Request-Method', 'GET')
        .set('Access-Control-Request-Headers', 'Content-Type')
        .expect(204);
      
      expect(res.headers).toHaveProperty('access-control-allow-origin');
      expect(res.headers).toHaveProperty('access-control-allow-methods');
      expect(res.headers).toHaveProperty('access-control-allow-headers');
    });
  });

  // Test CORS configuration endpoints
  describe('CORS Configuration', () => {
    it('should get current CORS configuration', async () => {
      const res = await request(app)
        .get('/cors/config')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('origin');
      expect(res.body.data).toHaveProperty('credentials');
    });

    it('should update CORS configuration', async () => {
      const newConfig = {
        origin: 'http://localhost:3001',
        credentials: true
      };
      
      const res = await request(app)
        .post('/cors/update')
        .send(newConfig)
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.origin).toBe(newConfig.origin);
      expect(res.body.data.credentials).toBe(newConfig.credentials);
    });

    it('should validate update request', async () => {
      const res = await request(app)
        .post('/cors/update')
        .send({})
        .expect(400);
      
      expect(res.body.success).toBe(false);
    });
  });

  // Test origin management
  describe('Origin Management', () => {
    it('should get allowed origins', async () => {
      const res = await request(app)
        .get('/cors/origins')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should add origin to whitelist', async () => {
      const res = await request(app)
        .post('/cors/origins/add')
        .send({ origin: 'https://example.com' })
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should validate origin when adding', async () => {
      const res = await request(app)
        .post('/cors/origins/add')
        .send({})
        .expect(400);
      
      expect(res.body.success).toBe(false);
    });
  });

  // Test health endpoint
  describe('Health Endpoint', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Server is running');
    });
  });

  // Test 404 handling
  describe('404 Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app)
        .get('/non-existent-route')
        .expect(404);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Route not found');
    });
  });
});