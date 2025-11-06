const CSVExporter = require('../services/export/csv.exporter');

describe('CSV Exporter', () => {
  let csvExporter;

  beforeEach(() => {
    csvExporter = new CSVExporter();
  });

  describe('export', () => {
    it('should export data to CSV format', async () => {
      const data = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
      ];

      const result = await csvExporter.export(data);
      
      expect(result).toContain('id,name,email');
      expect(result).toContain('1,John,john@example.com');
      expect(result).toContain('2,Jane,jane@example.com');
    });

    it('should handle empty data', async () => {
      const data = [];
      const result = await csvExporter.export(data);
      
      expect(result).toBe('');
    });

    it('should handle data with special characters', async () => {
      const data = [
        { id: 1, name: 'John, Jr.', email: 'john@example.com' }
      ];

      const result = await csvExporter.export(data);
      
      expect(result).toContain('"John, Jr."');
    });
  });
});