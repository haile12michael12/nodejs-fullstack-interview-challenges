// Auth tests
const { handleLogin, handleRefresh, handleLogout } = require('../services/userService');
const { createJWT } = require('../services/jwtService');

describe('Auth Service', () => {
  test('should login with valid credentials', async () => {
    const result = await handleLogin('admin', 'password123');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refreshToken');
    expect(result.user.username).toBe('admin');
  });

  test('should reject invalid credentials', async () => {
    await expect(handleLogin('admin', 'wrongpassword'))
      .rejects
      .toThrow('Invalid credentials');
  });

  test('should refresh token with valid refresh token', async () => {
    const loginResult = await handleLogin('admin', 'password123');
    const refreshResult = await handleRefresh(loginResult.refreshToken);
    expect(refreshResult).toHaveProperty('token');
  });

  test('should reject invalid refresh token', async () => {
    await expect(handleRefresh('invalid-token'))
      .rejects
      .toThrow('Invalid refresh token');
  });

  test('should logout successfully', async () => {
    const loginResult = await handleLogin('admin', 'password123');
    const result = await handleLogout(loginResult.refreshToken);
    expect(result.success).toBe(true);
  });
});