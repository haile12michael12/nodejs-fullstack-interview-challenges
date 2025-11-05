const zlib = require('zlib');
const { promisify } = require('util');
const { v4: uuidv4 } = require('uuid');

const gzip = promisify(zlib.gzip);
const brotliCompress = promisify(zlib.brotliCompress);

const compressData = async (data, algorithm = 'gzip') => {
  try {
    let compressedData;
    let originalSize = Buffer.byteLength(data, 'utf8');
    
    switch (algorithm) {
      case 'gzip':
        compressedData = await gzip(data);
        break;
      case 'brotli':
        compressedData = await brotliCompress(data);
        break;
      default:
        throw new Error(`Unsupported compression algorithm: ${algorithm}`);
    }
    
    let compressedSize = compressedData.length;
    let compressionRatio = (1 - (compressedSize / originalSize)) * 100;
    
    return {
      id: uuidv4(),
      originalSize,
      compressedSize,
      compressionRatio: compressionRatio.toFixed(2),
      algorithm,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Compression failed: ${error.message}`);
  }
};

module.exports = { compressData };