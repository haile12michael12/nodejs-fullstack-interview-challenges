const specs = require('../../config/swagger');

describe('Swagger Validation', () => {
  // Test that Swagger specification is valid
  describe('Swagger Specification', () => {
    it('should have required properties', () => {
      expect(specs).toHaveProperty('openapi');
      expect(specs).toHaveProperty('info');
      expect(specs).toHaveProperty('paths');
      expect(specs).toHaveProperty('components');
    });

    it('should have correct OpenAPI version', () => {
      expect(specs.openapi).toBe('3.0.0');
    });

    it('should have info properties', () => {
      expect(specs.info).toHaveProperty('title');
      expect(specs.info).toHaveProperty('version');
      expect(specs.info).toHaveProperty('description');
    });

    it('should have security schemes', () => {
      expect(specs.components).toHaveProperty('securitySchemes');
      expect(specs.components.securitySchemes).toHaveProperty('bearerAuth');
    });

    it('should have schema definitions', () => {
      expect(specs.components).toHaveProperty('schemas');
      expect(specs.components.schemas).toHaveProperty('User');
      expect(specs.components.schemas).toHaveProperty('Product');
      expect(specs.components.schemas).toHaveProperty('Error');
    });
  });

  // Test that paths are correctly defined
  describe('API Paths', () => {
    it('should define user paths', () => {
      // Check that user paths exist in the specification
      expect(specs.paths).toHaveProperty('/api/users');
      expect(specs.paths).toHaveProperty('/api/users/{id}');
    });

    it('should define product paths', () => {
      // Check that product paths exist in the specification
      expect(specs.paths).toHaveProperty('/api/products');
      expect(specs.paths).toHaveProperty('/api/products/{id}');
    });
  });

  // Test schema definitions
  describe('Schema Definitions', () => {
    it('should define User schema correctly', () => {
      const userSchema = specs.components.schemas.User;
      expect(userSchema).toHaveProperty('type', 'object');
      expect(userSchema).toHaveProperty('required');
      expect(userSchema.required).toContain('id');
      expect(userSchema.required).toContain('name');
      expect(userSchema.required).toContain('email');
    });

    it('should define Product schema correctly', () => {
      const productSchema = specs.components.schemas.Product;
      expect(productSchema).toHaveProperty('type', 'object');
      expect(productSchema).toHaveProperty('required');
      expect(productSchema.required).toContain('id');
      expect(productSchema.required).toContain('name');
      expect(productSchema.required).toContain('price');
    });
  });
});