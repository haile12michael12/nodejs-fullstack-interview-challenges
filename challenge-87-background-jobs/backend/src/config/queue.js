const Queue = require('bull');
const { redis: redisConfig, job: jobConfig } = require('./env');
const logger = require('../utils/logger');

let jobQueue;

const initializeQueue = () => {
  if (jobQueue) {
    return Promise.resolve(jobQueue);
  }

  // Create a new queue
  jobQueue = new Queue('background-jobs', {
    redis: {
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
  });

  jobQueue.on('error', (error) => {
    logger.error('Queue error:', error);
  });

  jobQueue.on('waiting', (jobId) => {
    logger.info(`Job ${jobId} is waiting to be processed`);
  });

  jobQueue.on('active', (job) => {
    logger.info(`Job ${job.id} is now active`);
  });

  jobQueue.on('completed', (job, result) => {
    logger.info(`Job ${job.id} completed with result:`, result);
  });

  jobQueue.on('failed', (job, err) => {
    logger.error(`Job ${job.id} failed with error:`, err);
  });

  logger.info('Job queue initialized');
  return Promise.resolve(jobQueue);
};

const getQueue = () => {
  if (!jobQueue) {
    throw new Error('Job queue not initialized. Call initializeQueue() first.');
  }
  return jobQueue;
};

module.exports = {
  initializeQueue,
  getQueue,
};