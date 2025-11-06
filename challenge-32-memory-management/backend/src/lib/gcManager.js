// Force garbage collection if available
const forceGC = () => {
  return new Promise((resolve, reject) => {
    if (global.gc) {
      const before = process.memoryUsage();
      global.gc();
      const after = process.memoryUsage();
      
      resolve({
        before,
        after,
        freed: {
          rss: before.rss - after.rss,
          heapTotal: before.heapTotal - after.heapTotal,
          heapUsed: before.heapUsed - after.heapUsed
        }
      });
    } else {
      reject(new Error('Garbage collection not exposed. Run with --expose-gc flag.'));
    }
  });
};

// Get GC statistics
const getGCStats = () => {
  return {
    memoryUsage: process.memoryUsage(),
    heapStatistics: {
      totalHeapSize: process.memoryUsage().heapTotal,
      usedHeapSize: process.memoryUsage().heapUsed,
      heapSizeLimit: require('v8').getHeapStatistics().heap_size_limit
    }
  };
};

module.exports = {
  forceGC,
  getGCStats
};