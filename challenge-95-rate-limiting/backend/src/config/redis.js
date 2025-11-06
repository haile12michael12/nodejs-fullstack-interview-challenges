const { createClient } = require('redis');
const config = require('./index');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = createClient({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  }
};

const getRedisClient = () => {
  return redisClient;
};

module.exports = {
  connectRedis,
  getRedisClient
};