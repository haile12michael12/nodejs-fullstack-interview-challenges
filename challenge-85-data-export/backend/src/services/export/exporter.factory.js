const CSVExporter = require('./csv.exporter');
const JSONExporter = require('./json.exporter');
const ExcelExporter = require('./excel.exporter');

class ExporterFactory {
  static createExporter(format) {
    switch (format.toLowerCase()) {
      case 'csv':
        return new CSVExporter();
      case 'json':
        return new JSONExporter();
      case 'excel':
        return new ExcelExporter();
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}

module.exports = ExporterFactory;