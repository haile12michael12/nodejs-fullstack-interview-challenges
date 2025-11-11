const logger = require('../../core/logger');

function echo(call, callback) {
  const { message } = call.request;
  logger.info('Echo request received', { message });
  
  // Simply echo back the same message
  callback(null, { message });
}

module.exports = {
  echo
};