const { parseBody } = require('../utils/request');
const { sendSuccess, sendError } = require('../utils/response');
const { createJWT } = require('../utils/jwt');
const { User } = require('../models/User');

async function handleLogin(req, res) {
  try {
    const body = await parseBody(req);
    const { username, password } = body;
    
    if (!username || !password) {
      return sendError(res, 400, 'Username and password required');
    }
    
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return sendError(res, 401, 'Invalid credentials');
    }
    
    const accessToken = createJWT(
      { userId: user.id, username: user.username },
      process.env.JWT_EXPIRATION || '1h'
    );
    const refreshToken = createJWT(
      { userId: user.id, type: 'refresh' },
      process.env.REFRESH_TOKEN_EXPIRATION || '7d'
    );
    
    sendSuccess(res, {
      token: accessToken,
      refreshToken,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    sendError(res, 500, 'Login failed', error.message);
  }
}

async function handleRefresh(req, res) {
  try {
    const body = await parseBody(req);
    const { refreshToken } = body;
    
    if (!refreshToken) {
      return sendError(res, 400, 'Refresh token required');
    }
    
    const payload = verifyJWT(refreshToken);
    if (payload.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }
    
    const user = await User.findById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const newAccessToken = createJWT(
      { userId: user.id, username: user.username },
      process.env.JWT_EXPIRATION || '1h'
    );
    
    sendSuccess(res, { token: newAccessToken });
  } catch (error) {
    sendError(res, 401, 'Invalid refresh token');
  }
}

async function handleMe(req, res) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }
    
    sendSuccess(res, {
      id: user.id,
      username: user.username
    });
  } catch (error) {
    sendError(res, 500, 'Failed to get user info');
  }
}

async function handleProtected(req, res) {
  sendSuccess(res, {
    message: `Hello ${req.user.username}!`,
    timestamp: new Date().toISOString(),
    userId: req.user.userId
  });
}

module.exports = {
  handleLogin,
  handleRefresh,
  handleMe,
  handleProtected
};

