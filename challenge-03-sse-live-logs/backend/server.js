const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Store connected SSE clients
const sseClients = new Set();

// Log generation
let logCounter = 0;
const logTypes = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
const logMessages = [
  'User login successful',
  'Database connection established',
  'Cache miss for key: user:123',
  'API request processed in 45ms',
  'File upload completed',
  'Memory usage: 75%',
  'Background job started',
  'Email sent successfully',
  'Invalid token provided',
  'Rate limit exceeded',
  'Configuration reloaded',
  'Session expired'
];

function generateRandomLog() {
  const timestamp = new Date().toISOString();
  const type = logTypes[Math.floor(Math.random() * logTypes.length)];
  const message = logMessages[Math.floor(Math.random() * logMessages.length)];
  const id = ++logCounter;
  
  return {
    id,
    timestamp,
    type,
    message,
    level: type === 'ERROR' ? 'error' : type === 'WARN' ? 'warn' : 'info'
  };
}

function sendSSEMessage(client, data) {
  try {
    const sseData = `data: ${JSON.stringify(data)}\n\n`;
    client.write(sseData);
  } catch (error) {
    console.error('Error sending SSE message:', error);
    sseClients.delete(client);
  }
}

function broadcastLog(logEntry) {
  sseClients.forEach(client => {
    sendSSEMessage(client, logEntry);
  });
}

// Generate logs periodically
setInterval(() => {
  const logEntry = generateRandomLog();
  console.log(`[${logEntry.timestamp}] ${logEntry.type}: ${logEntry.message}`);
  broadcastLog(logEntry);
}, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

// Utility functions
function sendResponse(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(typeof data === 'string' ? data : JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendResponse(res, statusCode, { error: message });
}

// Route handlers
function handleEvents(req, res) {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Send initial connection message
  const welcomeMessage = {
    id: 0,
    timestamp: new Date().toISOString(),
    type: 'INFO',
    message: 'Connected to live log stream',
    level: 'info'
  };
  sendSSEMessage(res, welcomeMessage);

  // Add client to the set
  sseClients.add(res);

  // Handle client disconnect
  req.on('close', () => {
    sseClients.delete(res);
  });

  req.on('error', () => {
    sseClients.delete(res);
  });

  // Send heartbeat every 30 seconds
  const heartbeat = setInterval(() => {
    if (sseClients.has(res)) {
      sendSSEMessage(res, { type: 'heartbeat', timestamp: new Date().toISOString() });
    } else {
      clearInterval(heartbeat);
    }
  }, 30000);
}

function handleLogs(req, res) {
  // Generate a few recent logs for the initial display
  const recentLogs = [];
  for (let i = 0; i < 10; i++) {
    recentLogs.unshift(generateRandomLog());
  }
  
  sendResponse(res, 200, { logs: recentLogs });
}

function handleTrigger(req, res) {
  // Manually trigger a log entry
  const logEntry = generateRandomLog();
  console.log(`[MANUAL TRIGGER] [${logEntry.timestamp}] ${logEntry.type}: ${logEntry.message}`);
  broadcastLog(logEntry);
  
  sendResponse(res, 200, { message: 'Log triggered', log: logEntry });
}

function handleStats(req, res) {
  const stats = {
    connectedClients: sseClients.size,
    totalLogs: logCounter,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  };
  
  sendResponse(res, 200, stats);
}

// Main server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  
  // CORS headers for non-SSE endpoints
  if (path !== '/events') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
      res.writeHead(200);
      return res.end();
    }
  }
  
  try {
    switch (path) {
      case '/events':
        if (method === 'GET') {
          handleEvents(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/logs':
        if (method === 'GET') {
          handleLogs(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/trigger':
        if (method === 'POST') {
          handleTrigger(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/stats':
        if (method === 'GET') {
          handleStats(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      default:
        sendError(res, 404, 'Not found');
    }
  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`SSE Live Logs server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /events - Server-Sent Events stream`);
  console.log(`  GET /logs - Get recent logs`);
  console.log(`  POST /trigger - Manually trigger a log entry`);
  console.log(`  GET /stats - Server statistics`);
  console.log(`\nLogs will be generated automatically every 2-5 seconds.`);
});
