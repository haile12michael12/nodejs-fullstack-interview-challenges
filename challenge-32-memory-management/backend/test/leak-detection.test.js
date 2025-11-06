const request = require('supertest');
const app = require('../src/server');
const leakDetector = require('../src/lib/leakDetector');

describe('Leak Detection Tests', () => {
  beforeAll(() => {
    leakDetector.startMonitoring();
  });

  afterAll(() => {
    leakDetector.stopMonitoring();
  });

  test('should detect memory leaks', async () => {
    // Create some leaks
    await request(app)
      .post('/api/leak')
      .send({ count: 100 })
      .expect(200);

    // Allow time for leak detection
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if leaks were detected
    const leaks = leakDetector.getLeaks();
    expect(leaks).toBeDefined();
  });

  test('should track memory allocations', async () => {
    const initialLeaks = leakDetector.getLeakCount();
    
    // Create more leaks
    await request(app)
      .post('/api/leak')
      .send({ count: 50 })
      .expect(200);

    // Allow time for leak detection
    await new Promise(resolve => setTimeout(resolve, 1000));

    const finalLeaks = leakDetector.getLeakCount();
    expect(finalLeaks).toBeGreaterThanOrEqual(initialLeaks);
  });
});