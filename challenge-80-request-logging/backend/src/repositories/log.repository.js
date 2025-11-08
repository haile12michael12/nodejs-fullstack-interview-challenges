const db = require('../database/inMemoryDB');

class LogRepository {
  // Create a new log entry
  async create(logData) {
    return db.create(logData);
  }

  // Find all logs with optional filters
  async findAll(filters = {}) {
    return db.findAll(filters);
  }

  // Find a log by ID
  async findById(id) {
    return db.findById(id);
  }

  // Search logs by criteria
  async search(criteria) {
    return db.findAll(criteria);
  }

  // Get log statistics
  async getStats() {
    return db.getStats();
  }

  // Delete old logs
  async deleteOlderThan(date) {
    return db.deleteOlderThan(date);
  }
}

module.exports = LogRepository;