class StatsAggregator {
  constructor() {
    this.statsHistory = [];
    this.maxHistory = 100;
  }

  async getCurrentStats() {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      workerId: process.pid,
      timestamp: new Date().toISOString(),
      memory: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      uptime: process.uptime(),
      loadAverage: require('os').loadavg()
    };
  }

  async getStatsHistory() {
    return this.statsHistory;
  }

  async recordStats() {
    const stats = await this.getCurrentStats();
    this.statsHistory.push(stats);
    
    // Keep only the last N records
    if (this.statsHistory.length > this.maxHistory) {
      this.statsHistory.shift();
    }
    
    return stats;
  }

  async getClusterStats() {
    // In a real implementation, this would aggregate stats from all workers
    // For this example, we'll just return the current worker stats
    return await this.getCurrentStats();
  }
}

module.exports = new StatsAggregator();