// Authentication logic, password hashing
const { createJWT } = require('./jwtService');
const { hashPassword, verifyPassword } = require('../utils/cryptoHash');
const { User } = require('../data/users.json');

// In-memory storage for refresh tokens (in production, use Redis or database)
const refreshTokens = new Map();

async function handleLogin(username, password) {
  if (!username || !password) {
    throw new Error('Username and password required');
  }
  
  const user = await User.findByCredentials(username, password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const accessToken = createJWT(
    { userId: user.id, username: user.username },
    process.env.JWT_EXPIRATION || '1h'
  );
  const refreshToken = createJWT(
    { userId: user.id, type: 'refresh' },
    process.env.REFRESH_TOKEN_EXPIRATION || '7d'
  );
  
  // Store refresh token
  refreshTokens.set(refreshToken, user.id);
  
  return {
    token: accessToken,
    refreshToken,
    user: { id: user.id, username: user.username }
  };
}

async function handleRefresh(refreshToken) {
  if (!refreshToken) {
    throw new Error('Refresh token required');
  }
  
  // Check if refresh token exists
  if (!refreshTokens.has(refreshToken)) {
    throw new Error('Invalid refresh token');
  }
  
  const payload = verifyJWT(refreshToken);
  if (payload.type !== 'refresh') {
    throw new Error('Invalid refresh token');
  }
  
  const userId = refreshTokens.get(refreshToken);
  const user = await User.findById(userId);
  if (!user) {
    // Remove invalid token
    refreshTokens.delete(refreshToken);
    throw new Error('User not found');
  }
  
  const newAccessToken = createJWT(
    { userId: user.id, username: user.username },
    process.env.JWT_EXPIRATION || '1h'
  );
  
  return { token: newAccessToken };
}

async function handleLogout(refreshToken) {
  if (!refreshToken) {
    throw new Error('Refresh token required');
  }
  
  // Remove refresh token
  refreshTokens.delete(refreshToken);
  
  return { success: true };
}

async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

async function getAllUsers() {
  return await User.findAll();
}

module.exports = {
  handleLogin,
  handleRefresh,
  handleLogout,
  getUserById,
  getAllUsers
};