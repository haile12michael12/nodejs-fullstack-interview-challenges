const request = require('supertest');
const app = require('../app');

describe('Export API', () => {
  describe('GET /export', () => {
    it('should export data as CSV by default', async () => {
      const res = await request(app)
        .get('/export')
        .expect(200);
      
      expect(res.headers['content-type']).toMatch(/text\/csv/);
      expect(res.headers['content-disposition']).toMatch(/attachment/);
    });

    it('should export data as JSON when format=json', async () => {
      const res = await request(app)
        .get('/export?format=json')
        .expect(200);
      
      expect(res.headers['content-type']).toMatch(/application\/json/);
    });

    it('should export data as Excel when format=excel', async () => {
      const res = await request(app)
        .get('/export?format=excel')
        .expect(200);
      
      expect(res.headers['content-type']).toMatch(/application\/vnd\.openxmlformats/);
    });

    it('should return error for invalid format', async () => {
      const res = await request(app)
        .get('/export?format=invalid')
        .expect(400);
      
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /export/advanced', () => {
    it('should create an advanced export job', async () => {
      const res = await request(app)
        .post('/export/advanced')
        .send({
          format: 'csv',
          filters: { department: 'Engineering' },
          options: { pretty: true }
        })
        .expect(202);
      
      expect(res.body.success).toBe(true);
      expect(res.body.jobId).toBeDefined();
    });
  });

  describe('GET /export/status/:id', () => {
    it('should return 404 for non-existent job', async () => {
      const res = await request(app)
        .get('/export/status/invalid-id')
        .expect(404);
      
      expect(res.body.success).toBe(false);
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