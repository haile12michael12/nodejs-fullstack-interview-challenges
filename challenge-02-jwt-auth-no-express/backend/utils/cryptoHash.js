// Password hashing utility
const crypto = require('crypto');

function hashPassword(password, salt = null) {
  // Generate a salt if not provided
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex');
  }
  
  // Create hash using PBKDF2
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  
  return {
    salt,
    hash
  };
}

function verifyPassword(password, salt, hash) {
  const hashed = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hashed === hash;
}

module.exports = {
  hashPassword,
  verifyPassword
};