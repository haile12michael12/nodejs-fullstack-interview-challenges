const ExportService = require('../services/export/export.service');
const ProgressService = require('../services/progress.service');
const { handleAsync } = require('../utils/error.handler');
const { validateExportRequest } = require('../utils/validation.helper');
const logger = require('../config/logger');

class ExportController {
  constructor() {
    this.exportService = new ExportService();
    this.progressService = new ProgressService();
  }

  exportData = handleAsync(async (req, res) => {
    const { format = 'csv' } = req.query;
    const filters = req.query;

    // Validate request
    const validation = validateExportRequest(req);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    try {
      const result = await this.exportService.exportData(format, filters);
      
      // Set appropriate headers for file download
      res.setHeader('Content-Type', result.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
      
      // Send the exported data
      if (Buffer.isBuffer(result.data)) {
        res.send(result.data);
      } else {
        res.send(result.data);
      }
    } catch (error) {
      logger.error('Export failed:', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  advancedExport = handleAsync(async (req, res) => {
    const { format = 'csv', filters = {}, options = {} } = req.body;

    // Validate request
    const validation = validateExportRequest(req);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    try {
      // Create export job
      const job = await this.progressService.createExportJob({
        format,
        filters,
        options,
      });

      // In a real implementation, this would be processed by a background worker
      // For now, we'll process it synchronously
      
      const result = await this.exportService.exportData(format, filters, options);
      
      // Update job as completed
      await this.progressService.markAsCompleted(job.id, {
        filename: result.filename,
        mimeType: result.mimeType,
      });

      res.status(202).json({
        success: true,
        jobId: job.id,
        message: 'Export job created successfully',
      });
    } catch (error) {
      logger.error('Advanced export failed:', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  getExportStatus = handleAsync(async (req, res) => {
    const { id } = req.params;

    try {
      const job = await this.progressService.getExportJob(id);
      
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Export job not found',
        });
      }

      res.json({
        success: true,
        data: job,
      });
    } catch (error) {
      logger.error('Get export status failed:', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
}

module.exports = ExportController;