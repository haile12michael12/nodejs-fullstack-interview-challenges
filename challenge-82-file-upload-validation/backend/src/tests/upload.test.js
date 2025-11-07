const request = require('supertest');
const app = require('../server');

describe('File Upload API', () => {
  // Test file upload endpoint
  describe('POST /upload', () => {
    it('should reject requests without a file', async () => {
      const res = await request(app)
        .post('/upload')
        .expect(400);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('No file uploaded');
    });

    it('should accept valid image files', async () => {
      const res = await request(app)
        .post('/upload')
        .attach('file', Buffer.from('test image content'), 'test.jpg')
        .expect(201);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('File uploaded successfully');
      expect(res.body.data).toBeDefined();
      expect(res.body.data.originalName).toBe('test.jpg');
    });

    it('should reject files that are too large', async () => {
      // Create a large buffer (15MB)
      const largeBuffer = Buffer.alloc(15 * 1024 * 1024, 'a');
      
      const res = await request(app)
        .post('/upload')
        .attach('file', largeBuffer, 'large-file.txt')
        .expect(413);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('File too large');
    });

    it('should reject invalid file types', async () => {
      const res = await request(app)
        .post('/upload')
        .attach('file', Buffer.from('test executable'), 'test.exe')
        .expect(400);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('File validation failed');
    });
  });

  // Test file listing endpoint
  describe('GET /files', () => {
    it('should return list of uploaded files', async () => {
      const res = await request(app)
        .get('/files')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Files retrieved successfully');
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // Test file retrieval endpoint
  describe('GET /files/:id', () => {
    it('should return 404 for non-existent file', async () => {
      const res = await request(app)
        .get('/files/non-existent-id')
        .expect(404);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('File not found');
    });
  });

  // Test file deletion endpoint
  describe('DELETE /files/:id', () => {
    it('should return 404 for non-existent file', async () => {
      const res = await request(app)
        .delete('/files/non-existent-id')
        .expect(404);
      
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('File not found');
    });
  });

  // Test health check endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body.status).toBe('OK');
    });
  });
});