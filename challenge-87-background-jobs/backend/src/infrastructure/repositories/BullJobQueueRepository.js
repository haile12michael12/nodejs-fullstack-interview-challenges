const IJobQueueRepository = require('../../core/interfaces/IJobQueueRepository');
const { getQueue } = require('../../config/queue');
const JobEntity = require('../../core/entities/JobEntity');
const logger = require('../../utils/logger');

class BullJobQueueRepository extends IJobQueueRepository {
  constructor() {
    super();
    this.queue = getQueue();
  }

  async addJob(jobData) {
    try {
      const job = await this.queue.add(jobData.type, jobData);
      logger.info(`Job added to queue: ${job.id}`, { jobId: job.id });
      
      return new JobEntity(
        job.id,
        jobData.type,
        jobData.payload,
        'pending',
        job.timestamp
      );
    } catch (error) {
      logger.error('Failed to add job to queue', { error: error.message });
      throw error;
    }
  }

  async getJob(jobId) {
    try {
      const job = await this.queue.getJob(jobId);
      if (!job) {
        return null;
      }

      return new JobEntity(
        job.id,
        job.name,
        job.data.payload,
        job.failedReason ? 'failed' : (job.finishedOn ? 'completed' : 'processing'),
        new Date(job.timestamp),
        job.finishedOn ? new Date(job.finishedOn) : new Date()
      );
    } catch (error) {
      logger.error(`Failed to get job ${jobId}`, { error: error.message });
      throw error;
    }
  }

  async getJobsByStatus(status) {
    try {
      let jobs;
      switch (status) {
        case 'completed':
          jobs = await this.queue.getCompleted();
          break;
        case 'failed':
          jobs = await this.queue.getFailed();
          break;
        case 'active':
          jobs = await this.queue.getActive();
          break;
        case 'waiting':
          jobs = await this.queue.getWaiting();
          break;
        default:
          jobs = await this.queue.getJobs(['completed', 'failed', 'active', 'waiting']);
      }

      return jobs.map(job => new JobEntity(
        job.id,
        job.name,
        job.data.payload,
        job.failedReason ? 'failed' : (job.finishedOn ? 'completed' : (job.processedOn ? 'processing' : 'waiting')),
        new Date(job.timestamp),
        job.finishedOn ? new Date(job.finishedOn) : new Date()
      ));
    } catch (error) {
      logger.error(`Failed to get jobs by status ${status}`, { error: error.message });
      throw error;
    }
  }

  async updateJobStatus(jobId, status) {
    // In Bull, job status is managed automatically
    // This method is kept for interface compliance
    logger.info(`Job status update requested: ${jobId} -> ${status}`);
  }

  async processJob(jobId, handler) {
    // In Bull, job processing is handled by workers
    // This method is kept for interface compliance
    logger.info(`Job processing requested: ${jobId}`);
  }
}

module.exports = BullJobQueueRepository;