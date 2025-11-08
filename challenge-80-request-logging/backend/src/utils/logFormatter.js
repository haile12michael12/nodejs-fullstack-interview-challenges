// Utility functions for formatting log data

// Format log data for API responses
const formatLogForResponse = (log) => {
  return {
    id: log.id,
    requestId: log.requestId,
    method: log.method,
    url: log.url,
    status: log.status,
    responseTime: log.responseTime ? parseInt(log.responseTime) : null,
    userAgent: log.userAgent,
    ip: log.ip,
    timestamp: log.timestamp,
    httpVersion: log.httpVersion,
    contentLength: log.contentLength ? parseInt(log.contentLength) : null
  };
};

// Format logs for list responses
const formatLogsForList = (logs) => {
  return logs.map(log => formatLogForResponse(log));
};

// Format log statistics
const formatLogStats = (stats) => {
  return {
    totalLogs: stats.totalLogs,
    statusCounts: stats.statusCounts,
    methodCounts: stats.methodCounts,
    avgResponseTime: stats.avgResponseTime,
    timestamp: new Date().toISOString()
  };
};

// Format performance data
const formatPerformanceData = (logs) => {
  const { calculateResponseTimeStats, getSlowRequests, getErrorRequests } = require('./performance');
  
  const stats = calculateResponseTimeStats(logs);
  const slowRequests = getSlowRequests(logs);
  const errorRequests = getErrorRequests(logs);
  
  return {
    responseTime: stats,
    slowRequests: slowRequests.length,
    errorRequests: errorRequests.length,
    totalRequests: logs.length
  };
};

module.exports = {
  formatLogForResponse,
  formatLogsForList,
  formatLogStats,
  formatPerformanceData
};