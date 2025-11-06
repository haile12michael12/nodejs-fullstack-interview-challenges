const redis = require('redis');
const { redis: redisConfig } = require('./env');
const logger = require('../utils/logger');

let redisClient;

const initializeRedis = async () => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = redis.createClient({
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
  });

  redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
  });

  await redisClient.connect();
  logger.info('Redis client connected');
  return redisClient;
};

const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call initializeRedis() first.');
  }
  return redisClient;
};

module.exports = {
  initializeRedis,
  getRedisClient,
};