const EncryptionUtil = require('../utils/encryption');
const { v4: uuidv4 } = require('uuid');

class EncryptionService {
  constructor() {
    this.keys = new Map();
    this.keys.set('primary', {
      id: 'primary',
      key: process.env.ENCRYPTION_KEY || EncryptionUtil.generateKey(),
      createdAt: new Date().toISOString(),
      isActive: true
    });
  }

  encryptData(data) {
    try {
      const encrypted = EncryptionUtil.encrypt(data);
      return {
        id: uuidv4(),
        ...encrypted,
        originalLength: data.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to encrypt data: ${error.message}`);
    }
  }

  decryptData(encryptedData, iv) {
    try {
      return EncryptionUtil.decrypt(encryptedData, iv);
    } catch (error) {
      throw new Error(`Failed to decrypt data: ${error.message}`);
    }
  }

  listKeys() {
    return Array.from(this.keys.values());
  }

  rotateKey() {
    const newKey = EncryptionUtil.generateKey();
    const oldKey = this.keys.get('primary');
    
    // Deactivate old key
    if (oldKey) {
      oldKey.isActive = false;
    }
    
    // Create new primary key
    const newKeyObj = {
      id: 'primary',
      key: newKey,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    this.keys.set('primary', newKeyObj);
    
    return {
      oldKeyId: oldKey ? oldKey.id : null,
      newKey: newKeyObj
    };
  }

  getKey(keyId) {
    return this.keys.get(keyId);
  }
}

module.exports = new EncryptionService();