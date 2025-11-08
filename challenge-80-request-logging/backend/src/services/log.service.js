const LogRepository = require('../repositories/log.repository');
const { formatLogsForList, formatLogStats, formatPerformanceData } = require('../utils/logFormatter');
const { groupLogsByTime } = require('../utils/performance');

class LogService {
  constructor() {
    this.logRepository = new LogRepository();
  }

  // Save a request log
  async saveRequestLog(logData) {
    return await this.logRepository.create(logData);
  }

  // Get all request logs
  async getRequestLogs(filters = {}) {
    const logs = await this.logRepository.findAll(filters);
    return formatLogsForList(logs);
  }

  // Get a specific request log by ID
  async getRequestLogById(id) {
    return await this.logRepository.findById(id);
  }

  // Search logs by criteria
  async searchLogs(criteria) {
    const logs = await this.logRepository.search(criteria);
    return formatLogsForList(logs);
  }

  // Get log statistics
  async getLogStats() {
    const stats = await this.logRepository.getStats();
    return formatLogStats(stats);
  }

  // Get performance data
  async getPerformanceData(filters = {}) {
    const logs = await this.logRepository.findAll(filters);
    return formatPerformanceData(logs);
  }

  // Get logs grouped by time intervals
  async getLogsByTime(interval = 'hour') {
    const logs = await this.logRepository.findAll();
    return groupLogsByTime(logs, interval);
  }

  // Delete old logs
  async deleteOldLogs(date) {
    return await this.logRepository.deleteOlderThan(date);
  }
}

module.exports = LogService;