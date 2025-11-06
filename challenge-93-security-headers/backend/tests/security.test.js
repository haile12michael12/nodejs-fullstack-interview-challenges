const request = require('supertest');
const app = require('../index');

describe('Security Headers', () => {
  test('should set security headers', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    // Check that security headers are set
    expect(response.headers).toHaveProperty('content-security-policy');
    expect(response.headers).toHaveProperty('strict-transport-security');
    expect(response.headers).toHaveProperty('x-frame-options');
    expect(response.headers).toHaveProperty('x-content-type-options');
    expect(response.headers).toHaveProperty('referrer-policy');
  });

  test('should return security config', async () => {
    const response = await request(app)
      .get('/api/security/config')
      .expect(200);
    
    expect(response.body).toHaveProperty('helmet');
  });

  test('should return security status', async () => {
    const response = await request(app)
      .get('/api/security/status')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'active');
    expect(response.body).toHaveProperty('headers');
  });
});