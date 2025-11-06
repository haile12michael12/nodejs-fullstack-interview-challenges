const request = require('supertest');
const app = require('../app');

describe('Pagination API', () => {
  describe('GET /items', () => {
    it('should return paginated items with default pagination', async () => {
      const res = await request(app)
        .get('/items')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.meta).toBeDefined();
      expect(res.body.meta.page).toBe(1);
      expect(res.body.meta.limit).toBe(10);
    });

    it('should return paginated items with custom pagination', async () => {
      const res = await request(app)
        .get('/items?page=2&limit=5')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.meta).toBeDefined();
      expect(res.body.meta.page).toBe(2);
      expect(res.body.meta.limit).toBe(5);
    });

    it('should respect maximum limit', async () => {
      const res = await request(app)
        .get('/items?limit=200')
        .expect(200);
      
      expect(res.body.meta.limit).toBe(100); // Max limit from config
    });

    it('should handle invalid pagination parameters', async () => {
      const res = await request(app)
        .get('/items?page=0&limit=-5')
        .expect(400);
      
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /items/count', () => {
    it('should return total item count', async () => {
      const res = await request(app)
        .get('/items/count')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.count).toBeGreaterThan(0);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body.status).toBe('OK');
    });
  });
});