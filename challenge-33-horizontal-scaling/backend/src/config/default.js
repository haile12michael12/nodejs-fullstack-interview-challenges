module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  
  // Cluster configuration
  maxWorkers: parseInt(process.env.MAX_WORKERS) || 4,
  minWorkers: parseInt(process.env.MIN_WORKERS) || 2,
  
  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'default-session-secret',
    ttl: parseInt(process.env.SESSION_TTL) || 3600 // 1 hour
  },
  
  // Redis configuration
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    prefix: 'session:'
  },
  
  // Scaling thresholds
  scaling: {
    scaleUpThreshold: parseInt(process.env.SCALE_UP_THRESHOLD) || 70, // CPU usage percentage
    scaleDownThreshold: parseInt(process.env.SCALE_DOWN_THRESHOLD) || 30, // CPU usage percentage
    cooldownPeriod: parseInt(process.env.COOLDOWN_PERIOD) || 60000 // 1 minute
  },
  
  // Health check configuration
  health: {
    checkInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 30000 // 30 seconds
  }
};