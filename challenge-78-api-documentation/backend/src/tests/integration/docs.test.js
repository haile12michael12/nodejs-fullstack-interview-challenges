const request = require('supertest');
const app = require('../../app');

describe('API Documentation', () => {
  // Test documentation endpoints
  describe('Documentation Endpoints', () => {
    it('should serve Swagger UI', async () => {
      const res = await request(app)
        .get('/docs/')
        .expect(200);
      
      expect(res.text).toContain('swagger-ui');
    });

    it('should serve Swagger JSON', async () => {
      const res = await request(app)
        .get('/docs/json')
        .expect(200);
      
      expect(res.headers['content-type']).toContain('application/json');
      expect(res.body).toHaveProperty('openapi');
      expect(res.body).toHaveProperty('info');
      expect(res.body).toHaveProperty('paths');
    });

    it('should serve Swagger YAML', async () => {
      const res = await request(app)
        .get('/docs/yaml')
        .expect(200);
      
      expect(res.headers['content-type']).toContain('text/yaml');
    });
  });

  // Test that API endpoints are documented
  describe('API Endpoint Documentation', () => {
    it('should document user endpoints', async () => {
      const res = await request(app)
        .get('/docs/json')
        .expect(200);
      
      expect(res.body.paths).toHaveProperty('/api/users');
      expect(res.body.paths).toHaveProperty('/api/users/{id}');
    });

    it('should document product endpoints', async () => {
      const res = await request(app)
        .get('/docs/json')
        .expect(200);
      
      expect(res.body.paths).toHaveProperty('/api/products');
      expect(res.body.paths).toHaveProperty('/api/products/{id}');
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