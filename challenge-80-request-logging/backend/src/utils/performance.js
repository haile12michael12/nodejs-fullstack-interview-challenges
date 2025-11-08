// Utility functions for performance monitoring

// Calculate response time statistics
const calculateResponseTimeStats = (logs) => {
  const responseTimes = logs
    .filter(log => log.responseTime && !isNaN(log.responseTime))
    .map(log => parseInt(log.responseTime));
  
  if (responseTimes.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
      median: 0
    };
  }
  
  // Sort response times
  responseTimes.sort((a, b) => a - b);
  
  // Calculate statistics
  const min = responseTimes[0];
  const max = responseTimes[responseTimes.length - 1];
  const avg = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  
  // Calculate median
  const mid = Math.floor(responseTimes.length / 2);
  const median = responseTimes.length % 2 !== 0 
    ? responseTimes[mid] 
    : (responseTimes[mid - 1] + responseTimes[mid]) / 2;
  
  return {
    min,
    max,
    avg: Math.round(avg * 100) / 100,
    median: Math.round(median * 100) / 100
  };
};

// Get slow requests (above threshold)
const getSlowRequests = (logs, threshold = 1000) => {
  return logs.filter(log => 
    log.responseTime && 
    !isNaN(log.responseTime) && 
    parseInt(log.responseTime) > threshold
  );
};

// Get error requests
const getErrorRequests = (logs) => {
  return logs.filter(log => 
    log.status && 
    parseInt(log.status) >= 400
  );
};

// Group logs by time intervals
const groupLogsByTime = (logs, interval = 'hour') => {
  const grouped = {};
  
  logs.forEach(log => {
    const date = new Date(log.timestamp);
    
    let key;
    switch (interval) {
      case 'minute':
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        break;
      case 'hour':
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
        break;
      case 'day':
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        break;
      default:
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
    }
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(log);
  });
  
  return grouped;
};

module.exports = {
  calculateResponseTimeStats,
  getSlowRequests,
  getErrorRequests,
  groupLogsByTime
};