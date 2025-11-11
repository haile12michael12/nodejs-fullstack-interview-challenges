// /login, /refresh, /logout
const { sendSuccess, sendError } = require('../core/response');
const { handleLogin, handleRefresh, handleLogout } = require('../services/userService');

async function handleLoginRoute(req, res) {
  try {
    const body = await parseBody(req);
    const result = await handleLogin(body.username, body.password);
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, 401, error.message);
  }
}

async function handleRefreshRoute(req, res) {
  try {
    const body = await parseBody(req);
    const result = await handleRefresh(body.refreshToken);
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, 401, error.message);
  }
}

async function handleLogoutRoute(req, res) {
  try {
    const body = await parseBody(req);
    await handleLogout(body.refreshToken);
    sendSuccess(res, { message: 'Logged out successfully' });
  } catch (error) {
    sendError(res, 400, error.message);
  }
}

// Helper function to parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk;
      
      // Prevent request body from getting too large
      if (body.length > 1e6) {
        reject(new Error('Request body too large'));
        return;
      }
    });
    
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    
    req.on('error', reject);
  });
}

module.exports = {
  handleLoginRoute,
  handleRefreshRoute,
  handleLogoutRoute
};