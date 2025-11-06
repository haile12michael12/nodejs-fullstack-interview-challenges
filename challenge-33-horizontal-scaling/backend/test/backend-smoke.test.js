const request = require('supertest');
const { app } = require('../src/worker');

describe('Backend Smoke Tests', () => {
  test('should return health check status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('workerId');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('should return API root endpoint', async () => {
    const response = await request(app)
      .get('/api')
      .expect(200);
    
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('workerId');
  });

  test('should handle session creation', async () => {
    const response = await request(app)
      .post('/api/session')
      .send({ test: 'data' })
      .expect(200);
    
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body).toHaveProperty('data');
  });

  test('should handle stats endpoint', async () => {
    const response = await request(app)
      .get('/api/stats')
      .expect(200);
    
    expect(response.body).toHaveProperty('workerId');
    expect(response.body).toHaveProperty('timestamp');
  });
});