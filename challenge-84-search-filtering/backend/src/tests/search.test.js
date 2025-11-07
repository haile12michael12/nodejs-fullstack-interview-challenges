const request = require('supertest');
const app = require('../app');

describe('Search API', () => {
  describe('GET /search', () => {
    it('should return search results with default pagination', async () => {
      const res = await request(app)
        .get('/search')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.meta).toBeDefined();
      expect(res.body.meta.pagination).toBeDefined();
    });

    it('should return search results with query parameter', async () => {
      const res = await request(app)
        .get('/search?q=item')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should return search results with filters', async () => {
      const res = await request(app)
        .get('/search?filter[category]=Electronics')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should return search results with sorting', async () => {
      const res = await request(app)
        .get('/search?sort=name&order=asc')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should handle invalid search query length', async () => {
      const res = await request(app)
        .get('/search?q=ab') // Less than minimum length of 3
        .expect(400);
      
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /search/advanced', () => {
    it('should return advanced search results', async () => {
      const res = await request(app)
        .post('/search/advanced')
        .send({
          name: 'Item',
          category: 'Electronics',
        })
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should handle price range filtering', async () => {
      const res = await request(app)
        .post('/search/advanced')
        .send({
          minPrice: 10,
          maxPrice: 100,
        })
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
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