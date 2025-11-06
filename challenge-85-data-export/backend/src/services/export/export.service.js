const ExporterFactory = require('./exporter.factory');
const DataRepository = require('../../repositories/data.repository');
const { generateExportFileName, getMimeType } = require('../../utils/file.helper');
const { env } = require('../../config');
const logger = require('../../config/logger');

class ExportService {
  constructor() {
    this.dataRepository = new DataRepository();
  }

  async exportData(format, filters = {}, options = {}) {
    try {
      // Validate format
      if (!['csv', 'json', 'excel'].includes(format.toLowerCase())) {
        throw new Error(`Unsupported export format: ${format}`);
      }

      // Get data
      const data = await this.dataRepository.findAll(filters);
      
      // Check if we exceed the maximum records
      if (data.length > env.export.maxRecords) {
        throw new Error(`Export exceeds maximum records limit: ${env.export.maxRecords}`);
      }

      // Create exporter
      const exporter = ExporterFactory.createExporter(format);
      
      // Export data
      const exportedData = await exporter.export(data, options);
      
      // Generate filename
      const filename = generateExportFileName(format);
      
      return {
        data: exportedData,
        filename,
        mimeType: getMimeType(format),
      };
    } catch (error) {
      logger.error('Export failed:', error);
      throw error;
    }
  }

  async streamExport(format, filters = {}, stream, options = {}) {
    try {
      // Validate format
      if (!['csv', 'json', 'excel'].includes(format.toLowerCase())) {
        throw new Error(`Unsupported export format: ${format}`);
      }

      // Create exporter
      const exporter = ExporterFactory.createExporter(format);
      
      // For streaming, we need to handle each format differently
      if (format === 'csv' || format === 'json') {
        const streamExporter = exporter.createStreamExporter(options);
        streamExporter.pipe(stream);
        
        // Stream data from repository
        await this.dataRepository.streamData(filters, streamExporter);
      } else {
        // For Excel, we need to collect all data first
        const data = await this.dataRepository.findAll(filters);
        const exportedData = await exporter.export(data, options);
        stream.write(exportedData);
        stream.end();
      }
    } catch (error) {
      logger.error('Stream export failed:', error);
      throw error;
    }
  }
}

module.exports = ExportService;