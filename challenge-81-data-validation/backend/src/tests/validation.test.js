const request = require('supertest');
const app = require('../app');

describe('Data Validation API', () => {
  // Test user validation
  describe('POST /api/validate/user', () => {
    it('should validate valid user data', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 25,
        phone: '1234567890',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      };

      const res = await request(app)
        .post('/api/validate/user')
        .send(userData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User data is valid');
    });

    it('should reject invalid user data', async () => {
      const userData = {
        firstName: 'J', // Too short
        lastName: 'Doe',
        email: 'invalid-email', // Invalid format
        age: 10 // Too young
      };

      const res = await request(app)
        .post('/api/validate/user')
        .send(userData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body.errors).toHaveLength(3);
    });
  });

  // Test product validation
  describe('POST /api/validate/product', () => {
    it('should validate valid product data', async () => {
      const productData = {
        name: 'Smartphone',
        description: 'A great smartphone',
        price: 599.99,
        category: 'electronics',
        inStock: true,
        tags: ['mobile', 'tech']
      };

      const res = await request(app)
        .post('/api/validate/product')
        .send(productData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Product data is valid');
    });

    it('should reject invalid product data', async () => {
      const productData = {
        name: 'Sm', // Too short
        description: 'A great smartphone',
        price: -10, // Negative price
        category: 'invalid-category' // Invalid category
      };

      const res = await request(app)
        .post('/api/validate/product')
        .send(productData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body.errors).toHaveLength(3);
    });
  });

  // Test user creation with validation
  describe('POST /api/user', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        age: 30
      };

      const res = await request(app)
        .post('/api/user')
        .send(userData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User created successfully');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.firstName).toBe(userData.firstName);
    });

    it('should reject user creation with invalid data', async () => {
      const userData = {
        firstName: 'J',
        lastName: 'Smith',
        email: 'invalid-email',
        age: 300
      };

      const res = await request(app)
        .post('/api/user')
        .send(userData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation failed');
    });
  });

  // Test product creation with validation
  describe('POST /api/product', () => {
    it('should create a product with valid data', async () => {
      const productData = {
        name: 'Laptop',
        price: 1299.99,
        category: 'electronics'
      };

      const res = await request(app)
        .post('/api/product')
        .send(productData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Product created successfully');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(productData.name);
    });

    it('should reject product creation with invalid data', async () => {
      const productData = {
        name: 'L',
        price: -100,
        category: 'invalid'
      };

      const res = await request(app)
        .post('/api/product')
        .send(productData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation failed');
    });
  });

  // Test validation rules endpoint
  describe('GET /api/validation/rules', () => {
    it('should return validation rules', async () => {
      const res = await request(app)
        .get('/api/validation/rules')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Validation rules retrieved successfully');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data).toHaveProperty('product');
    });
  });

  // Test health check endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);

      expect(res.body.status).toBe('OK');
      expect(res.body.service).toBe('data-validation-service');
    });
  });
});