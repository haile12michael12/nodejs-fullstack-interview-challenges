const request = require('supertest');
const app = require('../server');

describe('Health Checks', () => {
  test('should return basic health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('should return detailed health status', async () => {
    const response = await request(app)
      .get('/api/health/detailed')
      .expect(200);
    
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('system');
  });

  test('should return readiness status', async () => {
    const response = await request(app)
      .get('/api/health/ready')
      .expect(200);
    
    expect(response.body).toHaveProperty('status');
  });

  test('should return liveness status', async () => {
    const response = await request(app)
      .get('/api/health/alive')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'alive');
  });
});