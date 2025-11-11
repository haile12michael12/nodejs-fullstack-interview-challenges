const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { SSEManager } = require('./utils/sse');
const { Logger } = require('./logger');
const serverConfig = require('./config/serverConfig');

const PORT = serverConfig.port;

// Initialize managers
const sseManager = new SSEManager();
const logger = new Logger();

// Generate logs periodically
setInterval(() => {
  const logEntry = logger.generateRandomLog();
  logger.logToFile(logEntry);
  sseManager.broadcast(logEntry);
}, serverConfig.logIntervalMin + Math.random() * (serverConfig.logIntervalMax - serverConfig.logIntervalMin));

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
  sseManager.sendToClient(res, welcomeMessage);

  // Add client to the manager
  sseManager.addClient(res);

  // Handle client disconnect
  req.on('close', () => {
    sseManager.removeClient(res);
  });

  req.on('error', () => {
    sseManager.removeClient(res);
  });

  // Send heartbeat every 30 seconds
  const heartbeat = setInterval(() => {
    if (sseManager.clients.has(res)) {
      sseManager.sendHeartbeat();
    } else {
      clearInterval(heartbeat);
    }
  }, serverConfig.heartbeatInterval);
}

function handleLogs(req, res) {
  // Generate a few recent logs for the initial display
  const recentLogs = [];
  for (let i = 0; i < 10; i++) {
    recentLogs.unshift(logger.generateRandomLog());
  }
  
  sendResponse(res, 200, { logs: recentLogs });
}

function handleTrigger(req, res) {
  // Manually trigger a log entry
  const logEntry = logger.generateRandomLog();
  const logMessage = `[MANUAL TRIGGER] [${logEntry.timestamp}] ${logEntry.type}: ${logEntry.message}`;
  console.log(logMessage);
  logger.logToFile(logEntry);
  sseManager.broadcast(logEntry);
  
  sendResponse(res, 200, { message: 'Log triggered', log: logEntry });
}

function handleStats(req, res) {
  const stats = {
    connectedClients: sseManager.getClientCount(),
    totalLogs: logger.getLogCounter(),
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
  console.log(`\nLogs will be generated automatically every ${serverConfig.logIntervalMin/1000}-${serverConfig.logIntervalMax/1000} seconds.`);
});
