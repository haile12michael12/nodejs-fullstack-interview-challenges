const request = require('supertest');
const app = require('../../server');

describe('Rate Limiter', () => {
  test('should allow requests under the limit', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
    
    expect(response.body).toHaveProperty('message');
  });

  test('should return rate limit headers', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
    
    expect(response.headers).toHaveProperty('x-ratelimit-limit');
    expect(response.headers).toHaveProperty('x-ratelimit-remaining');
  });

  test('should return health check without rate limiting', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
  });
});