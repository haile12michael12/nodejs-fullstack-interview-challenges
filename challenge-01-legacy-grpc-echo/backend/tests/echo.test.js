const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { createServer } = require('../src/core/server');

// Load proto file
const PROTO_PATH = path.join(__dirname, '../proto/echo.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const echoProto = grpc.loadPackageDefinition(packageDefinition).echo;

describe('Echo Service', () => {
  let server;
  let client;
  const TEST_PORT = 50052;

  beforeAll((done) => {
    // Start server
    server = createServer();
    server.bind(`localhost:${TEST_PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();

    // Create client
    const address = `localhost:${TEST_PORT}`;
    const credentials = grpc.credentials.createInsecure();
    client = new echoProto.EchoService(address, credentials);

    // Wait a bit for server to be ready
    setTimeout(done, 100);
  });

  afterAll(() => {
    server.forceShutdown();
  });

  test('should echo back the same message', (done) => {
    const testMessage = 'Hello, gRPC!';
    
    client.Echo({ message: testMessage }, (err, response) => {
      expect(err).toBeNull();
      expect(response.message).toBe(testMessage);
      done();
    });
  });
});