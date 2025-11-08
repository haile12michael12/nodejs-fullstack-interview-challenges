const config = require('../config');
const envSchema = require('../config/env.validation');

describe('Configuration', () => {
  // Test environment variable validation
  describe('Environment Validation', () => {
    it('should validate required environment variables', () => {
      // This test assumes the environment is properly set up
      expect(config).toBeDefined();
      expect(config.NODE_ENV).toBeDefined();
      expect(config.PORT).toBeDefined();
    });

    it('should have valid environment schema', () => {
      expect(envSchema).toBeDefined();
      expect(typeof envSchema.validate).toBe('function');
    });

    it('should validate correct environment variables', () => {
      const testEnv = {
        NODE_ENV: 'test',
        PORT: '3000',
        DB_HOST: 'localhost',
        API_KEY: 'test-key'
      };
      
      const { error } = envSchema.validate(testEnv);
      expect(error).toBeUndefined();
    });

    it('should reject missing required variables', () => {
      const testEnv = {
        NODE_ENV: 'test',
        PORT: '3000'
        // Missing DB_HOST and API_KEY
      };
      
      const { error } = envSchema.validate(testEnv);
      expect(error).toBeDefined();
      expect(error.details.length).toBeGreaterThan(0);
    });
  });

  // Test environment-specific configuration
  describe('Environment Configuration', () => {
    it('should load environment-specific config', () => {
      expect(config.env).toBeDefined();
      expect(['development', 'production', 'test']).toContain(config.env);
    });

    it('should have database configuration', () => {
      expect(config.db).toBeDefined();
      expect(config.db.host).toBeDefined();
      expect(config.db.port).toBeDefined();
    });

    it('should have logging configuration', () => {
      expect(config.logging).toBeDefined();
      expect(config.logging.level).toBeDefined();
    });
  });

  // Test secrets management
  describe('Secrets Management', () => {
    it('should have secrets manager', () => {
      expect(config.secrets).toBeDefined();
      expect(typeof config.secrets.get).toBe('function');
      expect(typeof config.secrets.set).toBe('function');
    });

    it('should handle secrets properly', () => {
      config.secrets.set('test-key', 'test-value');
      expect(config.secrets.get('test-key')).toBe('test-value');
    });
  });
});