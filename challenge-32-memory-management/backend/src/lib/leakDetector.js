const memwatch = require('memwatch-next');

class LeakDetector {
  constructor() {
    this.leaks = [];
    this.isMonitoring = false;
  }
  
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    memwatch.on('leak', (info) => {
      console.warn('Memory leak detected:', info);
      this.leaks.push({
        ...info,
        timestamp: new Date().toISOString()
      });
    });
    
    memwatch.on('stats', (stats) => {
      console.log('GC stats:', stats);
    });
  }
  
  stopMonitoring() {
    this.isMonitoring = false;
    memwatch.removeAllListeners('leak');
    memwatch.removeAllListeners('stats');
  }
  
  getLeaks() {
    return this.leaks;
  }
  
  clearLeaks() {
    this.leaks = [];
  }
  
  getLeakCount() {
    return this.leaks.length;
  }
}

module.exports = new LeakDetector();