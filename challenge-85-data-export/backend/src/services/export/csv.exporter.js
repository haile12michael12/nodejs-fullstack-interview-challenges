const { Parser } = require('json2csv');
const { Transform } = require('stream');

class CSVExporter {
  constructor() {
    this.parser = new Parser();
  }

  async export(data, options = {}) {
    try {
      return this.parser.parse(data);
    } catch (error) {
      throw new Error(`CSV export failed: ${error.message}`);
    }
  }

  createStreamExporter(options = {}) {
    const transformStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        try {
          // Convert chunk to CSV format
          const csvData = typeof chunk === 'string' ? chunk : JSON.stringify(chunk);
          callback(null, csvData + '\n');
        } catch (error) {
          callback(error);
        }
      }
    });

    return transformStream;
  }
}

module.exports = CSVExporter;