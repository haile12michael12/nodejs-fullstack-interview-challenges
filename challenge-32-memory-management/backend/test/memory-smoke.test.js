const request = require('supertest');
const app = require('../src/server');

describe('Memory Management Smoke Tests', () => {
  test('should return health check status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('should return memory statistics', async () => {
    const response = await request(app)
      .get('/api/memory-stats')
      .expect(200);
    
    expect(response.body).toHaveProperty('memory');
    expect(response.body.memory).toHaveProperty('rss');
    expect(response.body.memory).toHaveProperty('heapTotal');
    expect(response.body.memory).toHaveProperty('heapUsed');
  });

  test('should allocate memory', async () => {
    const response = await request(app)
      .post('/api/allocate')
      .send({ size: 100, count: 5 })
      .expect(200);
    
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('totalObjects');
  });

  test('should create memory leak', async () => {
    const response = await request(app)
      .post('/api/leak')
      .send({ count: 10 })
      .expect(200);
    
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('totalLeakyObjects');
  });
});