const request = require('supertest');
const app = require('../app');

describe('Import API', () => {
  test('should return health check status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('should reject upload without file', async () => {
    const response = await request(app)
      .post('/api/import/upload')
      .expect(400);
    
    expect(response.body).toHaveProperty('error', 'No file uploaded');
  });

  test('should list imports', async () => {
    const response = await request(app)
      .get('/api/import/imports')
      .expect(200);
    
    expect(response.body).toBeInstanceOf(Array);
  });
});