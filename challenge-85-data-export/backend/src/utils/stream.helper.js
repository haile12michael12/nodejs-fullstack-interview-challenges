const { Transform } = require('stream');

class JSONToCSVTransform extends Transform {
  constructor(opts) {
    super({ objectMode: true });
    this.opts = opts;
    this.headersWritten = false;
  }

  _transform(chunk, encoding, callback) {
    try {
      if (!this.headersWritten) {
        const headers = Object.keys(chunk).join(',');
        this.push(headers + '\n');
        this.headersWritten = true;
      }
      
      const values = Object.values(chunk).map(value => {
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
      
      this.push(values + '\n');
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = {
  JSONToCSVTransform,
};