const request = require('supertest');
const app = require('../app');

describe('Log Controller', () => {
  // Test getting logs
  describe('GET /api/logs/requests', () => {
    it('should return list of request logs', async () => {
      // First make a request to generate a log
      await request(app)
        .get('/api/health')
        .expect(200);
      
      // Then get the logs
      const res = await request(app)
        .get('/api/logs/requests')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Logs retrieved successfully');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should filter logs by method', async () => {
      const res = await request(app)
        .get('/api/logs/requests?method=GET')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // Test getting a specific log
  describe('GET /api/logs/requests/:id', () => {
    it('should return 404 for non-existent log', async () => {
      const res = await request(app)
        .get('/api/logs/requests/999999')
        .expect(404);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Log not found');
    });
  });

  // Test searching logs
  describe('POST /api/logs/search', () => {
    it('should search logs by criteria', async () => {
      const res = await request(app)
        .post('/api/logs/search')
        .send({ method: 'GET' })
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Logs searched successfully');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // Test getting statistics
  describe('GET /api/logs/stats', () => {
    it('should return log statistics', async () => {
      const res = await request(app)
        .get('/api/logs/stats')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Statistics retrieved successfully');
      expect(res.body.data).toHaveProperty('totalLogs');
      expect(res.body.data).toHaveProperty('statusCounts');
      expect(res.body.data).toHaveProperty('methodCounts');
    });
  });

  // Test getting performance data
  describe('GET /api/logs/performance', () => {
    it('should return performance data', async () => {
      const res = await request(app)
        .get('/api/logs/performance')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Performance data retrieved successfully');
      expect(res.body.data).toHaveProperty('responseTime');
      expect(res.body.data).toHaveProperty('slowRequests');
      expect(res.body.data).toHaveProperty('errorRequests');
    });
  });
});