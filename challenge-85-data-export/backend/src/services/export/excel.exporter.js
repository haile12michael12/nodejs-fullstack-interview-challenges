const XLSX = require('xlsx');

class ExcelExporter {
  async export(data, options = {}) {
    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      
      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName || 'Data');
      
      // Write to buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      
      return buffer;
    } catch (error) {
      throw new Error(`Excel export failed: ${error.message}`);
    }
  }

  createStreamExporter(options = {}) {
    // For streaming Excel export, we would need to use a different approach
    // This is a simplified version that collects all data before exporting
    const chunks = [];
    
    return {
      write: (chunk) => {
        chunks.push(chunk);
      },
      end: () => {
        // This would be called when all data is collected
        return this.export(chunks);
      }
    };
  }
}

module.exports = ExcelExporter;