require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  encryption: {
    key: process.env.ENCRYPTION_KEY || 'default-encryption-key-32-characters!',
    algorithm: process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm',
    keyRotationInterval: process.env.KEY_ROTATION_INTERVAL || '30d'
  }
};

module.exports = config;