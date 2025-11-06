const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');

// Create Redis client
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Create Redis store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'session:',
  ttl: 3600 // 1 hour
});

// Create session middleware
const sessionMiddleware = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET || 'default-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
});

module.exports = {
  middleware: sessionMiddleware,
  store: redisStore,
  client: redisClient
};