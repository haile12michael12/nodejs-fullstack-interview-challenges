const os = require('os');

class PerformanceTracker {
  static getMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    return {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
      arrayBuffers: memoryUsage.arrayBuffers
    };
  }

  static getCpuUsage() {
    const cpus = os.cpus();
    return {
      count: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed,
      loadAverage: os.loadavg()
    };
  }

  static getSystemInfo() {
    return {
      platform: os.platform(),
      arch: os.arch(),
      uptime: os.uptime(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem()
    };
  }

  static getPerformanceMetrics() {
    return {
      timestamp: new Date().toISOString(),
      memory: this.getMemoryUsage(),
      cpu: this.getCpuUsage(),
      system: this.getSystemInfo(),
      process: {
        uptime: process.uptime(),
        pid: process.pid
      }
    };
  }
}

module.exports = PerformanceTracker;