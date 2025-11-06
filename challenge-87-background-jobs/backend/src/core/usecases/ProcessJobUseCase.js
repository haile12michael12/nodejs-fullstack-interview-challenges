const JobService = require('../../infrastructure/services/JobService');
const logger = require('../../utils/logger');

class ProcessJobUseCase {
  constructor(jobService = null) {
    this.jobService = jobService || new JobService();
  }

  async execute(jobId, jobData) {
    try {
      logger.info(`Processing job ${jobId}`, { jobId, jobData });

      // Update job status to processing
      await this.jobService.updateJobStatus(jobId, 'processing');

      // Simulate job processing based on job type
      const result = await this.processJobByType(jobData.type, jobData.payload);

      // Update job status to completed
      await this.jobService.updateJobStatus(jobId, 'completed');

      logger.info(`Job ${jobId} completed successfully`, { jobId, result });
      return result;
    } catch (error) {
      logger.error(`Job ${jobId} failed`, { jobId, error: error.message });

      // Update job status to failed
      await this.jobService.updateJobStatus(jobId, 'failed');

      throw error;
    }
  }

  async processJobByType(type, payload) {
    switch (type) {
      case 'email':
        return this.processEmailJob(payload);
      case 'image_processing':
        return this.processImageJob(payload);
      case 'data_export':
        return this.processDataExportJob(payload);
      default:
        throw new Error(`Unknown job type: ${type}`);
    }
  }

  async processEmailJob(payload) {
    // Simulate email sending
    logger.info('Sending email', payload);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2s delay
    return { success: true, messageId: `msg_${Date.now()}` };
  }

  async processImageJob(payload) {
    // Simulate image processing
    logger.info('Processing image', payload);
    await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate 5s delay
    return { success: true, processedImage: `processed_${payload.imageId}` };
  }

  async processDataExportJob(payload) {
    // Simulate data export
    logger.info('Exporting data', payload);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate 3s delay
    return { success: true, exportFile: `export_${Date.now()}.csv` };
  }
}

module.exports = ProcessJobUseCase;