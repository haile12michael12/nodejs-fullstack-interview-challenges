const IJobService = require('../../core/interfaces/IJobService');
const BullJobQueueRepository = require('../repositories/BullJobQueueRepository');
const JobEntity = require('../../core/entities/JobEntity');
const logger = require('../../utils/logger');

class JobService extends IJobService {
  constructor(jobQueueRepository = null) {
    super();
    this.jobQueueRepository = jobQueueRepository || new BullJobQueueRepository();
  }

  async createJob(type, payload) {
    try {
      const jobData = {
        type,
        payload,
        timestamp: Date.now(),
      };

      const jobEntity = await this.jobQueueRepository.addJob(jobData);
      logger.info(`Job created: ${jobEntity.id}`, { jobId: jobEntity.id, type });
      return jobEntity;
    } catch (error) {
      logger.error('Failed to create job', { error: error.message, type, payload });
      throw error;
    }
  }

  async getJobById(id) {
    try {
      const jobEntity = await this.jobQueueRepository.getJob(id);
      if (!jobEntity) {
        logger.warn(`Job not found: ${id}`);
        return null;
      }
      return jobEntity;
    } catch (error) {
      logger.error(`Failed to get job ${id}`, { error: error.message });
      throw error;
    }
  }

  async getAllJobs() {
    try {
      // Get jobs with different statuses
      const waitingJobs = await this.jobQueueRepository.getJobsByStatus('waiting');
      const activeJobs = await this.jobQueueRepository.getJobsByStatus('active');
      const completedJobs = await this.jobQueueRepository.getJobsByStatus('completed');
      const failedJobs = await this.jobQueueRepository.getJobsByStatus('failed');

      // Combine all jobs
      const allJobs = [...waitingJobs, ...activeJobs, ...completedJobs, ...failedJobs];
      
      // Remove duplicates and sort by creation time
      const uniqueJobs = Array.from(new Map(allJobs.map(job => [job.id, job])).values());
      uniqueJobs.sort((a, b) => b.createdAt - a.createdAt);
      
      return uniqueJobs;
    } catch (error) {
      logger.error('Failed to get all jobs', { error: error.message });
      throw error;
    }
  }

  async getJobsByStatus(status) {
    try {
      const jobs = await this.jobQueueRepository.getJobsByStatus(status);
      return jobs;
    } catch (error) {
      logger.error(`Failed to get jobs by status ${status}`, { error: error.message });
      throw error;
    }
  }

  async updateJobStatus(id, status) {
    try {
      await this.jobQueueRepository.updateJobStatus(id, status);
      logger.info(`Job status updated: ${id} -> ${status}`, { jobId: id, status });
    } catch (error) {
      logger.error(`Failed to update job status ${id}`, { error: error.message, jobId: id, status });
      throw error;
    }
  }
}

module.exports = JobService;