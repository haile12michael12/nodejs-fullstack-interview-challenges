const http = require('http');
const { setupTracing } = require('./tracing');

// Initialize OpenTelemetry tracing
setupTracing();

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    // Simulate getting users with a call to another service
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }] }));
  } else if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});