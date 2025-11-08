// In-memory database to store request logs
class InMemoryDB {
  constructor() {
    this.logs = [];
    this.nextId = 1;
  }

  // Create a new log entry
  create(logData) {
    const log = {
      id: this.nextId++,
      ...logData,
      timestamp: new Date().toISOString()
    };
    this.logs.push(log);
    return log;
  }

  // Find all logs with optional filters
  findAll(filters = {}) {
    let results = [...this.logs];
    
    // Apply filters
    if (filters.method) {
      results = results.filter(log => log.method === filters.method);
    }
    
    if (filters.status) {
      results = results.filter(log => log.status === parseInt(filters.status));
    }
    
    if (filters.url) {
      results = results.filter(log => log.url && log.url.includes(filters.url));
    }
    
    if (filters.requestId) {
      results = results.filter(log => log.requestId === filters.requestId);
    }
    
    // Sort by timestamp descending (newest first)
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return results;
  }

  // Find a log by ID
  findById(id) {
    return this.logs.find(log => log.id === parseInt(id));
  }

  // Delete logs older than a certain date
  deleteOlderThan(date) {
    const cutoffDate = new Date(date);
    const initialLength = this.logs.length;
    this.logs = this.logs.filter(log => new Date(log.timestamp) >= cutoffDate);
    return initialLength - this.logs.length;
  }

  // Get statistics
  getStats() {
    const totalLogs = this.logs.length;
    
    // Group by status code
    const statusCounts = {};
    this.logs.forEach(log => {
      const status = log.status || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    // Group by method
    const methodCounts = {};
    this.logs.forEach(log => {
      const method = log.method || 'unknown';
      methodCounts[method] = (methodCounts[method] || 0) + 1;
    });
    
    // Calculate average response time
    const responseTimes = this.logs
      .filter(log => log.responseTime)
      .map(log => parseInt(log.responseTime));
    
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;
    
    return {
      totalLogs,
      statusCounts,
      methodCounts,
      avgResponseTime: Math.round(avgResponseTime * 100) / 100
    };
  }
}

module.exports = new InMemoryDB();