const grpc = require('grpc');
const logger = require('./logger');

function sendHealthCheckResponse(call, callback) {
  logger.info('Health check requested');
  callback(null, {
    status: 'SERVING'
  });
}

module.exports = {
  sendHealthCheckResponse
};