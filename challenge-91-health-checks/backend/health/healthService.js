const config = require('../config');
const dependencyChecker = require('../utils/dependencyChecker');

class HealthService {
  static async checkHealth() {
    const startTime = Date.now();
    
    // Basic health check
    const systemInfo = {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    };
    
    // Check dependencies
    const dependencies = await dependencyChecker.checkAll();
    
    const healthStatus = {
      status: dependencies.healthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      system: systemInfo,
      dependencies
    };
    
    return healthStatus;
  }
  
  static async checkDetailedHealth() {
    const basicHealth = await this.checkHealth();
    
    // Add more detailed information
    const detailedInfo = {
      ...basicHealth,
      version: require('../package.json').version,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    };
    
    return detailedInfo;
  }
  
  static async checkReadiness() {
    // Check if the service is ready to serve requests
    try {
      // Add any specific readiness checks here
      return { ready: true };
    } catch (error) {
      return { ready: false, error: error.message };
    }
  }
}

module.exports = HealthService;