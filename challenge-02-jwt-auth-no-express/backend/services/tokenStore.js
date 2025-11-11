// Refresh token storage (memory/file-based)
const fs = require('fs').promises;
const path = require('path');

// In-memory storage for refresh tokens
const refreshTokens = new Map();

// File path for persistent storage
const TOKEN_FILE = path.join(__dirname, '../data/refreshTokens.json');

class TokenStore {
  constructor() {
    this.tokens = refreshTokens;
    this.loadTokens();
  }

  // Add a refresh token
  async addToken(token, userId) {
    this.tokens.set(token, userId);
    await this.saveTokens();
  }

  // Validate a refresh token
  async validateToken(token) {
    return this.tokens.has(token);
  }

  // Get user ID associated with a token
  async getUserId(token) {
    return this.tokens.get(token);
  }

  // Remove a refresh token
  async removeToken(token) {
    this.tokens.delete(token);
    await this.saveTokens();
  }

  // Clear all tokens for a user
  async clearUserTokens(userId) {
    for (const [token, storedUserId] of this.tokens.entries()) {
      if (storedUserId === userId) {
        this.tokens.delete(token);
      }
    }
    await this.saveTokens();
  }

  // Save tokens to file
  async saveTokens() {
    try {
      const tokensArray = Array.from(this.tokens.entries());
      await fs.writeFile(TOKEN_FILE, JSON.stringify(tokensArray, null, 2));
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  }

  // Load tokens from file
  async loadTokens() {
    try {
      const data = await fs.readFile(TOKEN_FILE, 'utf8');
      const tokensArray = JSON.parse(data);
      this.tokens = new Map(tokensArray);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty store
      this.tokens = new Map();
    }
  }

  // Get all tokens (for debugging)
  getAllTokens() {
    return Array.from(this.tokens.entries());
  }
}

// Export singleton instance
module.exports = new TokenStore();