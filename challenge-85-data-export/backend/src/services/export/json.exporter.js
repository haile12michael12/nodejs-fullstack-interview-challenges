const { Transform } = require('stream');

class JSONExporter {
  async export(data, options = {}) {
    try {
      return JSON.stringify(data, null, options.pretty ? 2 : 0);
    } catch (error) {
      throw new Error(`JSON export failed: ${error.message}`);
    }
  }

  createStreamExporter(options = {}) {
    const transformStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        try {
          const jsonData = typeof chunk === 'string' ? chunk : JSON.stringify(chunk);
          callback(null, jsonData + '\n');
        } catch (error) {
          callback(error);
        }
      }
    });

    return transformStream;
  }
}

module.exports = JSONExporter;