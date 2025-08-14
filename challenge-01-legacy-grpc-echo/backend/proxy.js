const express = require('express');
const cors = require('cors');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

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

// Create gRPC client
const client = new echoProto.EchoService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create proxy endpoint
app.post('/echo', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  client.Echo({ message }, (err, response) => {
    if (err) {
      console.error('Error calling gRPC service:', err);
      return res.status(500).json({ error: 'Failed to call Echo service' });
    }
    
    res.json(response);
  });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});