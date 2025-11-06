const crypto = require('crypto');
const config = require('../config');

class EncryptionUtil {
  static encrypt(text) {
    try {
      const algorithm = config.encryption.algorithm;
      const key = crypto.scryptSync(config.encryption.key, 'GfG', 32);
      const iv = crypto.randomBytes(16);
      
      const cipher = crypto.createCipher(algorithm, key);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      return {
        encryptedData: encrypted,
        iv: iv.toString('hex'),
        algorithm: algorithm
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  static decrypt(encryptedData, iv) {
    try {
      const algorithm = config.encryption.algorithm;
      const key = crypto.scryptSync(config.encryption.key, 'GfG', 32);
      
      const decipher = crypto.createDecipher(algorithm, key);
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  static generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  static hashData(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
}

module.exports = EncryptionUtil;