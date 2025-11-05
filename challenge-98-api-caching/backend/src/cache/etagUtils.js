const crypto = require('crypto');

const generateETag = (data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  
  return crypto.createHash('md5').update(data).digest('hex');
};

const validateETag = (data, etag) => {
  const generatedETag = generateETag(data);
  return generatedETag === etag;
};

module.exports = {
  generateETag,
  validateETag
};