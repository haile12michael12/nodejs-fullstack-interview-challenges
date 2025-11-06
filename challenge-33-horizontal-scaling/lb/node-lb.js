const http = require('http');
const httpProxy = require('http-proxy');
const cookie = require('cookie');

// Create proxy server
const proxy = httpProxy.createProxyServer({});

// List of backend servers
const servers = [
  { host: 'localhost', port: 3001 },
  { host: 'localhost', port: 3002 },
  { host: 'localhost', port: 3003 }
];

let current = 0;

// Round-robin load balancing with sticky sessions
function getTarget(req) {
  // Check for sticky session cookie
  const cookies = cookie.parse(req.headers.cookie || '');
  if (cookies.sticky_server) {
    const serverIndex = parseInt(cookies.sticky_server);
    if (serverIndex >= 0 && serverIndex < servers.length) {
      return servers[serverIndex];
    }
  }
  
  // Round-robin selection
  const target = servers[current];
  current = (current + 1) % servers.length;
  return target;
}

// Create load balancer server
const lb = http.createServer((req, res) => {
  const target = getTarget(req);
  
  // Add sticky session cookie
  res.setHeader('Set-Cookie', `sticky_server=${servers.indexOf(target)}; Path=/`);
  
  // Proxy the request
  proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Load Balancer Error');
  });
});

// Handle WebSocket upgrades
lb.on('upgrade', (req, socket, head) => {
  const target = getTarget(req);
  proxy.ws(req, socket, head, { target: `http://${target.host}:${target.port}` });
});

// Error handling
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (res && !res.headersSent) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy Error');
  }
});

const PORT = process.env.LB_PORT || 8080;
lb.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
  console.log('Backend servers:', servers);
});