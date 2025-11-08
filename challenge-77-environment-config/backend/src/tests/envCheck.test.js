const { checkEnvironment } = require('../interfaces/cli/envCheck');
const ConfigService = require('../domain/services/config.service');

describe('Environment Check CLI', () => {
  // Mock console.log to capture output
  let consoleLogSpy;
  
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  // Test environment check functionality
  describe('Environment Check', () => {
    it('should run environment check without errors', () => {
      expect(() => {
        checkEnvironment();
      }).not.toThrow();
    });

    it('should display environment information', () => {
      checkEnvironment();
      
      // Check that console.log was called
      expect(consoleLogSpy).toHaveBeenCalled();
      
      // Check that environment info was displayed
      const calls = consoleLogSpy.mock.calls;
      const envCall = calls.find(call => call[0] && call[0].includes('Environment:'));
      expect(envCall).toBeDefined();
    });

    it('should validate configuration', () => {
      checkEnvironment();
      
      // Check that validation result was displayed
      const calls = consoleLogSpy.mock.calls;
      const validationCall = calls.find(call => call[0] && call[0].includes('Configuration Valid:'));
      expect(validationCall).toBeDefined();
    });
  });

  // Test configuration service integration
  describe('Configuration Service Integration', () => {
    it('should use ConfigService correctly', () => {
      const configService = new ConfigService();
      
      expect(configService.getAllConfig).toBeDefined();
      expect(configService.getConfig).toBeDefined();
      expect(configService.validateConfig).toBeDefined();
      
      // Test that methods return expected structure
      const config = configService.getAllConfig();
      expect(config).toHaveProperty('env');
      expect(config).toHaveProperty('port');
    });

    it('should validate configuration correctly', () => {
      const configService = new ConfigService();
      const validation = configService.validateConfig();
      
      expect(validation).toHaveProperty('isValid');
      expect(validation).toHaveProperty('environment');
    });
  });
});