const JSONExporter = require('../services/export/json.exporter');

describe('JSON Exporter', () => {
  let jsonExporter;

  beforeEach(() => {
    jsonExporter = new JSONExporter();
  });

  describe('export', () => {
    it('should export data to JSON format', async () => {
      const data = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
      ];

      const result = await jsonExporter.export(data);
      const parsed = JSON.parse(result);
      
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].id).toBe(1);
      expect(parsed[1].name).toBe('Jane');
    });

    it('should export data with pretty formatting', async () => {
      const data = [{ id: 1, name: 'John' }];
      
      const result = await jsonExporter.export(data, { pretty: true });
      
      expect(result).toContain('\n');
      expect(result).toContain('  ');
    });

    it('should handle empty data', async () => {
      const data = [];
      const result = await jsonExporter.export(data);
      const parsed = JSON.parse(result);
      
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(0);
    });
  });
});