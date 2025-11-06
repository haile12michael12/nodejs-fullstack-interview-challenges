const { getQueue } = require('../../config/queue');
const ProcessJobUseCase = require('../../core/usecases/ProcessJobUseCase');
const logger = require('../../utils/logger');

class JobWorker {
  constructor() {
    this.processJobUseCase = new ProcessJobUseCase();
    this.queue = getQueue();
  }

  start() {
    // Process email jobs
    this.queue.process('email', async (job) => {
      logger.info(`Processing email job ${job.id}`, { jobId: job.id });
      return await this.processJobUseCase.execute(job.id, job.data);
    });

    // Process image processing jobs
    this.queue.process('image_processing', async (job) => {
      logger.info(`Processing image job ${job.id}`, { jobId: job.id });
      return await this.processJobUseCase.execute(job.id, job.data);
    });

    // Process data export jobs
    this.queue.process('data_export', async (job) => {
      logger.info(`Processing data export job ${job.id}`, { jobId: job.id });
      return await this.processJobUseCase.execute(job.id, job.data);
    });

    logger.info('Job workers started');
  }

  stop() {
    this.queue.close();
    logger.info('Job workers stopped');
  }
}

// Start the worker
const worker = new JobWorker();
worker.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  worker.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  worker.stop();
  process.exit(0);
});

module.exports = JobWorker;