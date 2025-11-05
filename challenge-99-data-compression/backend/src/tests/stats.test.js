const { updateStats, getCompressionStats } = require('../services/statsService');

describe('Stats Service', () => {
  beforeEach(() => {
    // Reset stats before each test
    const statsService = require('../services/statsService');
    statsService.compressionStats = {
      totalCompressions: 0,
      totalDataCompressed: 0,
      averageCompressionRatio: 0,
      algorithms: {
        gzip: { count: 0, totalRatio: 0 },
        brotli: { count: 0, totalRatio: 0 }
      }
    };
  });

  test('should update stats correctly', async () => {
    const compressionResult = {
      originalSize: 1000,
      compressedSize: 500,
      compressionRatio: '50.00',
      algorithm: 'gzip'
    };

    updateStats(compressionResult);
    const stats = await getCompressionStats();

    expect(stats.totalCompressions).toBe(1);
    expect(stats.totalDataCompressed).toBe(1000);
    expect(stats.algorithms.gzip.count).toBe(1);
  });

  test('should calculate average compression ratio', async () => {
    const result1 = {
      originalSize: 1000,
      compressedSize: 500,
      compressionRatio: '50.00',
      algorithm: 'gzip'
    };

    const result2 = {
      originalSize: 1000,
      compressedSize: 500,
      compressionRatio: '50.00',
      algorithm: 'brotli'
    };

    updateStats(result1);
    updateStats(result2);
    const stats = await getCompressionStats();

    expect(stats.averageCompressionRatio).toBe('50.00');
  });
});