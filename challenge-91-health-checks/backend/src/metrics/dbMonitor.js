class DatabaseMonitor {
  constructor() {
    this.slowQueries = [];
    this.queryThreshold = 1000; // ms
  }

  trackQuery(queryType, table, duration) {
    // Record query duration
    const { dbQueryDuration, slowQueriesTotal } = require('./prometheus');
    
    dbQueryDuration.observe({ query_type: queryType, table }, duration / 1000);
    
    // Check for slow queries
    if (duration > this.queryThreshold) {
      slowQueriesTotal.inc({ query_type: queryType, table });
      
      this.slowQueries.push({
        id: Date.now(),
        queryType,
        table,
        duration,
        timestamp: new Date().toISOString()
      });
      
      // Keep only the last 100 slow queries
      if (this.slowQueries.length > 100) {
        this.slowQueries.shift();
      }
    }
  }

  getSlowQueries() {
    return this.slowQueries;
  }

  clearSlowQueries() {
    this.slowQueries = [];
  }

  setSlowQueryThreshold(threshold) {
    this.queryThreshold = threshold;
  }
}

module.exports = new DatabaseMonitor();