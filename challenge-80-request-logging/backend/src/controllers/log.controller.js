const LogService = require('../services/log.service');

class LogController {
  constructor() {
    this.logService = new LogService();
  }

  // Get all request logs
  getLogs = async (req, res) => {
    try {
      const filters = req.query;
      const logs = await this.logService.getRequestLogs(filters);
      
      res.json({
        success: true,
        message: 'Logs retrieved successfully',
        data: logs,
        meta: {
          count: logs.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve logs',
        error: error.message
      });
    }
  };

  // Get a specific request log by ID
  getLogById = async (req, res) => {
    try {
      const { id } = req.params;
      const log = await this.logService.getRequestLogById(id);
      
      if (!log) {
        return res.status(404).json({
          success: false,
          message: 'Log not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Log retrieved successfully',
        data: log
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve log',
        error: error.message
      });
    }
  };

  // Search logs by criteria
  searchLogs = async (req, res) => {
    try {
      const criteria = req.body;
      const logs = await this.logService.searchLogs(criteria);
      
      res.json({
        success: true,
        message: 'Logs searched successfully',
        data: logs,
        meta: {
          count: logs.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search logs',
        error: error.message
      });
    }
  };

  // Get log statistics
  getStats = async (req, res) => {
    try {
      const stats = await this.logService.getLogStats();
      
      res.json({
        success: true,
        message: 'Statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve statistics',
        error: error.message
      });
    }
  };

  // Get performance data
  getPerformance = async (req, res) => {
    try {
      const filters = req.query;
      const performance = await this.logService.getPerformanceData(filters);
      
      res.json({
        success: true,
        message: 'Performance data retrieved successfully',
        data: performance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve performance data',
        error: error.message
      });
    }
  };
}

module.exports = LogController;