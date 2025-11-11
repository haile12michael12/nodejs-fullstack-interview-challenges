const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { loadProto } = require('./loader');
const { echoService } = require('../services/echo/service');
const logger = require('./logger');
const { sendHealthCheckResponse } = require('./healthcheck');

// Load proto file
const PROTO_PATH = path.join(__dirname, '../../proto/echo.proto');
const packageDefinition = loadProto(PROTO_PATH);
const echoProto = grpc.loadPackageDefinition(packageDefinition).echo;

// Create gRPC server
function createServer() {
  const server = new grpc.Server();
  
  // Add Echo service
  server.addService(echoProto.EchoService.service, echoService);
  
  // Add Health service
  server.addService(grpc.health.v1.Health.service, {
    check: sendHealthCheckResponse
  });
  
  return server;
}

function start() {
  const server = createServer();
  const port = process.env.PORT || 50051;
  
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  
  logger.info(`gRPC server running on port ${port}`);
}

module.exports = {
  createServer,
  start
};