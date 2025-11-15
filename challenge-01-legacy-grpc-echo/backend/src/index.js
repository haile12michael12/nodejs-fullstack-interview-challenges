const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Main startup file
require('dotenv').config();
const server = require('./core/server');

// Start the gRPC server
server.start();

// Load proto file
const PROTO_PATH = path.join(__dirname, 'proto/echo.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const echoProto = grpc.loadPackageDefinition(packageDefinition).echo;

// Implement the Echo service
function echo(call, callback) {
  console.log('Received echo request:', call.request);
  callback(null, { message: call.request.message });
}

// Create gRPC server
function main() {
  const server = new grpc.Server();
  server.addService(echoProto.EchoService.service, { Echo: echo });
  
  const port = 50051;
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  
  console.log(`gRPC server running on port ${port}`);
}

main();