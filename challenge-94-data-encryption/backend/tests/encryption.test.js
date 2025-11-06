const EncryptionUtil = require('../src/utils/encryption');
const encryptionService = require('../src/services/encryptionService');

describe('Encryption Service', () => {
  test('should encrypt and decrypt data', () => {
    const testData = 'This is a secret message';
    const encrypted = encryptionService.encryptData(testData);
    const decrypted = encryptionService.decryptData(encrypted.encryptedData, encrypted.iv);
    
    expect(decrypted).toBe(testData);
  });

  test('should list encryption keys', () => {
    const keys = encryptionService.listKeys();
    expect(keys).toBeInstanceOf(Array);
    expect(keys.length).toBeGreaterThan(0);
  });

  test('should rotate encryption key', () => {
    const result = encryptionService.rotateKey();
    expect(result).toHaveProperty('newKey');
    expect(result.newKey).toHaveProperty('key');
  });
});