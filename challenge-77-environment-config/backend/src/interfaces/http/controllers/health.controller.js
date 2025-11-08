const ConfigService = require('../../../domain/services/config.service');
const database = require('../../../infrastructure/database');
const config = require('../../../config');
const logger = require('../../../infrastructure/logging/logger');

class HealthController {
  constructor() {
    this.configService = new ConfigService();
  }

  // Health check endpoint
  getHealth = (req, res) => {
    try {
      const healthCheck = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.env,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        database: {
          connected: database.isConnected()
        }
      };

      res.status(200).json(healthCheck);
    } catch (error) {
      logger.error('Health check failed:', error);
      res.status(500).json({
        status: 'error',
        message: 'Health check failed'
      });
    }
  };

  // Configuration endpoint
  getConfig = (req, res) => {
    try {
      const configService = new ConfigService();
      const configuration = configService.getAllConfig();
      
      res.status(200).json({
        status: 'ok',
        data: configuration
      });
    } catch (error) {
      logger.error('Config retrieval failed:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve configuration'
      });
    }
  };

  // Environment info endpoint
  getEnvironment = (req, res) => {
    try {
      const configService = new ConfigService();
      const envInfo = {
        environment: configService.getEnvironmentConfig(),
        features: configService.getFeatureFlags(),
        api: configService.getApiConfig(),
        security: configService.getSecurityConfig(),
        validation: configService.validateConfig()
      };
      
      res.status(200).json({
        status: 'ok',
        data: envInfo
      });
    } catch (error) {
      logger.error('Environment info retrieval failed:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve environment information'
      });
    }
  };
}

module.exports = HealthController;