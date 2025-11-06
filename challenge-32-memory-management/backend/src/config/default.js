module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  
  // Memory management configuration
  memory: {
    maxHeapSize: process.env.MAX_HEAP_SIZE || 512, // MB
    gcInterval: parseInt(process.env.GC_INTERVAL) || 30000, // 30 seconds
    warningThreshold: parseInt(process.env.MEMORY_WARNING_THRESHOLD) || 80, // Percentage
    criticalThreshold: parseInt(process.env.MEMORY_CRITICAL_THRESHOLD) || 90 // Percentage
  },
  
  // Heap snapshot configuration
  heap: {
    snapshotDir: process.env.HEAP_SNAPSHOT_DIR || './snapshots',
    autoCapture: process.env.AUTO_CAPTURE_SNAPSHOTS === 'true'
  },
  
  // Leak detection configuration
  leakDetection: {
    enabled: process.env.LEAK_DETECTION_ENABLED === 'true',
    threshold: parseInt(process.env.LEAK_THRESHOLD) || 1000 // Number of objects
  },
  
  // Profiling configuration
  profiling: {
    heap: process.env.PROFILE_HEAP === 'true',
    cpu: process.env.PROFILE_CPU === 'true'
  }
};