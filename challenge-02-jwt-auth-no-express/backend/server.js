const http = require('http');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory user store (replace with real database)
const users = [
  { id: 1, username: 'admin', password: 'password123' },
  { id: 2, username: 'user', password: 'user123' }
];

// JWT utility functions
function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str) {
  str += new Array(5 - str.length % 4).join('=');
  str = str.replace(/\-/g, '+').replace(/_/g, '/');
  return Buffer.from(str, 'base64');
}

function createJWT(payload, secret, expiresIn = '1h') {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (expiresIn === '1h' ? 3600 : 7 * 24 * 3600); // 1 hour or 7 days
  
  const payloadWithExp = { ...payload, iat: now, exp };
  
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payloadWithExp));
  
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');
    
    const [header, payload, signature] = parts;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }
    
    // Decode payload
    const decodedPayload = JSON.parse(base64UrlDecode(payload).toString());
    
    // Check expiration
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
    
    return decodedPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Utility functions
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendResponse(res, statusCode, { error: message });
}

// Route handlers
async function handleLogin(req, res) {
  const body = await parseBody(req);
  const { username, password } = body;
  
  if (!username || !password) {
    return sendError(res, 400, 'Username and password required');
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return sendError(res, 401, 'Invalid credentials');
  }
  
  const accessToken = createJWT({ userId: user.id, username: user.username }, JWT_SECRET, '1h');
  const refreshToken = createJWT({ userId: user.id, type: 'refresh' }, JWT_SECRET, '7d');
  
  sendResponse(res, 200, {
    token: accessToken,
    refreshToken,
    user: { id: user.id, username: user.username }
  });
}

async function handleRefresh(req, res) {
  const body = await parseBody(req);
  const { refreshToken } = body;
  
  if (!refreshToken) {
    return sendError(res, 400, 'Refresh token required');
  }
  
  try {
    const payload = verifyJWT(refreshToken, JWT_SECRET);
    if (payload.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }
    
    const user = users.find(u => u.id === payload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const newAccessToken = createJWT({ userId: user.id, username: user.username }, JWT_SECRET, '1h');
    
    sendResponse(res, 200, { token: newAccessToken });
  } catch (error) {
    sendError(res, 401, 'Invalid refresh token');
  }
}

async function handleMe(req, res, token) {
  try {
    const payload = verifyJWT(token, JWT_SECRET);
    const user = users.find(u => u.id === payload.userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    sendResponse(res, 200, {
      id: user.id,
      username: user.username
    });
  } catch (error) {
    sendError(res, 401, 'Invalid token');
  }
}

async function handleProtected(req, res, token) {
  try {
    const payload = verifyJWT(token, JWT_SECRET);
    sendResponse(res, 200, {
      message: `Hello ${payload.username}!`,
      timestamp: new Date().toISOString(),
      userId: payload.userId
    });
  } catch (error) {
    sendError(res, 401, 'Invalid token');
  }
}

// Main server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }
  
  // Extract token from Authorization header
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  try {
    switch (path) {
      case '/login':
        if (method === 'POST') {
          await handleLogin(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/refresh':
        if (method === 'POST') {
          await handleRefresh(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/me':
        if (method === 'GET') {
          if (!token) {
            return sendError(res, 401, 'Token required');
          }
          await handleMe(req, res, token);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/protected':
        if (method === 'GET') {
          if (!token) {
            return sendError(res, 401, 'Token required');
          }
          await handleProtected(req, res, token);
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
  console.log(`JWT Auth server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /login - Login with username/password`);
  console.log(`  POST /refresh - Refresh access token`);
  console.log(`  GET /me - Get current user (requires token)`);
  console.log(`  GET /protected - Protected endpoint (requires token)`);
  console.log(`\nTest users:`);
  console.log(`  admin / password123`);
  console.log(`  user / user123`);
});
