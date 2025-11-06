const request = require('supertest');
const app = require('../../server');

// Mock the job queue to avoid actual Redis connections
jest.mock('../../src/config/queue');

describe('Job Endpoints', () => {
  describe('POST /api/jobs', () => {
    it('should create a new job', async () => {
      const jobData = {
        type: 'email',
        payload: {
          to: 'test@example.com',
          subject: 'Test Email',
          body: 'This is a test email',
        },
      };

      const response = await request(app)
        .post('/api/jobs')
        .send(jobData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.type).toBe(jobData.type);
      expect(response.body.data.payload).toEqual(jobData.payload);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/jobs')
        .send({ type: 'email' })
        .expect(400);

      expect(response.body.error).toBe('Missing required fields: type and payload');
    });
  });

  describe('GET /api/jobs/:id', () => {
    it('should return a job by ID', async () => {
      // First create a job to get its ID
      const createResponse = await request(app)
        .post('/api/jobs')
        .send({
          type: 'email',
          payload: { to: 'test@example.com', subject: 'Test' },
        });

      const jobId = createResponse.body.data.id;

      // Then get the job by ID
      const response = await request(app)
        .get(`/api/jobs/${jobId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(jobId);
    });

    it('should return 404 if job is not found', async () => {
      const response = await request(app)
        .get('/api/jobs/999')
        .expect(404);

      expect(response.body.error).toBe('Job not found');
    });
  });

  describe('GET /api/jobs', () => {
    it('should return all jobs', async () => {
      // Create a couple of jobs
      await request(app)
        .post('/api/jobs')
        .send({
          type: 'email',
          payload: { to: 'test1@example.com', subject: 'Test 1' },
        });

      await request(app)
        .post('/api/jobs')
        .send({
          type: 'email',
          payload: { to: 'test2@example.com', subject: 'Test 2' },
        });

      const response = await request(app)
        .get('/api/jobs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    });
  });
});