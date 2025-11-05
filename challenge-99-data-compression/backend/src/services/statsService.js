let compressionStats = {
  totalCompressions: 0,
  totalDataCompressed: 0,
  averageCompressionRatio: 0,
  algorithms: {
    gzip: { count: 0, totalRatio: 0 },
    brotli: { count: 0, totalRatio: 0 }
  }
};

const updateStats = (compressionResult) => {
  compressionStats.totalCompressions++;
  compressionStats.totalDataCompressed += compressionResult.originalSize;
  
  // Update algorithm stats
  const algorithm = compressionResult.algorithm;
  if (compressionStats.algorithms[algorithm]) {
    compressionStats.algorithms[algorithm].count++;
    compressionStats.algorithms[algorithm].totalRatio += parseFloat(compressionResult.compressionRatio);
  }
  
  // Calculate average compression ratio
  const totalRatio = Object.values(compressionStats.algorithms)
    .reduce((sum, algo) => sum + algo.totalRatio, 0);
  compressionStats.averageCompressionRatio = 
    (totalRatio / compressionStats.totalCompressions).toFixed(2);
};

const getCompressionStats = async () => {
  return {
    ...compressionStats,
    algorithms: {
      gzip: {
        ...compressionStats.algorithms.gzip,
        averageRatio: compressionStats.algorithms.gzip.count > 0 
          ? (compressionStats.algorithms.gzip.totalRatio / compressionStats.algorithms.gzip.count).toFixed(2)
          : 0
      },
      brotli: {
        ...compressionStats.algorithms.brotli,
        averageRatio: compressionStats.algorithms.brotli.count > 0 
          ? (compressionStats.algorithms.brotli.totalRatio / compressionStats.algorithms.brotli.count).toFixed(2)
          : 0
      }
    }
  };
};

module.exports = { updateStats, getCompressionStats };