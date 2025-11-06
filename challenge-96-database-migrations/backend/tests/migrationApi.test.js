const request = require('supertest');
const app = require('../src/app');

describe('Migration API', () => {
  test('should get migration status', async () => {
    const response = await request(app)
      .get('/api/migrations/status')
      .expect(200);
    
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('status');
  });

  test('should run migrations', async () => {
    const response = await request(app)
      .post('/api/migrations/run')
      .expect(200);
    
    expect(response.body).toHaveProperty('success');
  });

  test('should rollback migration', async () => {
    const response = await request(app)
      .post('/api/migrations/rollback')
      .expect(200);
    
    expect(response.body).toHaveProperty('success');
  });
});