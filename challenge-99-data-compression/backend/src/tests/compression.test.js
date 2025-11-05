const { compressData } = require('../services/compressionService');

describe('Compression Service', () => {
  test('should compress data with gzip', async () => {
    const testData = 'This is a test string for compression';
    const result = await compressData(testData, 'gzip');
    
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('originalSize');
    expect(result).toHaveProperty('compressedSize');
    expect(result).toHaveProperty('compressionRatio');
    expect(result.algorithm).toBe('gzip');
  });

  test('should compress data with brotli', async () => {
    const testData = 'This is a test string for compression';
    const result = await compressData(testData, 'brotli');
    
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('originalSize');
    expect(result).toHaveProperty('compressedSize');
    expect(result).toHaveProperty('compressionRatio');
    expect(result.algorithm).toBe('brotli');
  });

  test('should throw error for unsupported algorithm', async () => {
    const testData = 'This is a test string for compression';
    
    await expect(compressData(testData, 'unsupported'))
      .rejects
      .toThrow('Unsupported compression algorithm');
  });
});