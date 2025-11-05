const zlib = require('zlib');

const isBrotliSupported = () => {
  return typeof zlib.brotliCompress === 'function';
};

const getBrotliOptions = () => {
  return {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_SIZE_HINT]: 0
    }
  };
};

module.exports = {
  isBrotliSupported,
  getBrotliOptions
};