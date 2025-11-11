// JWT tests
const { createJWT, verifyJWT } = require('../services/jwtService');

describe('JWT Service', () => {
  test('should create and verify a valid token', () => {
    const payload = { userId: 1, username: 'testuser' };
    const token = createJWT(payload);
    const verified = verifyJWT(token);
    expect(verified.userId).toBe(1);
    expect(verified.username).toBe('testuser');
  });

  test('should reject an invalid token', () => {
    expect(() => verifyJWT('invalid.token.here')).toThrow('Invalid token');
  });

  test('should reject a token with invalid signature', () => {
    const payload = { userId: 1, username: 'testuser' };
    const token = createJWT(payload);
    const parts = token.split('.');
    const invalidToken = `${parts[0]}.${parts[1]}.invalidsignature`;
    expect(() => verifyJWT(invalidToken)).toThrow('Invalid token');
  });
});