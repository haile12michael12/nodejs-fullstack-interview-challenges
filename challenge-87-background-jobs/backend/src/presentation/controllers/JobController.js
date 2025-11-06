const JobService = require('../../infrastructure/services/JobService');
const logger = require('../../utils/logger');

class JobController {
  constructor(jobService = null) {
    this.jobService = jobService || new JobService();
  }

  createJob = async (req, res, next) => {
    try {
      const { type, payload } = req.body;

      if (!type || !payload) {
        return res.status(400).json({
          error: 'Missing required fields: type and payload',
        });
      }

      const job = await this.jobService.createJob(type, payload);
      
      res.status(201).json({
        success: true,
        data: job.toObject(),
      });
    } catch (error) {
      logger.error('Failed to create job', { error: error.message });
      next(error);
    }
  };

  getJobById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const job = await this.jobService.getJobById(id);

      if (!job) {
        return res.status(404).json({
          error: 'Job not found',
        });
      }

      res.json({
        success: true,
        data: job.toObject(),
      });
    } catch (error) {
      logger.error(`Failed to get job ${req.params.id}`, { error: error.message });
      next(error);
    }
  };

  getAllJobs = async (req, res, next) => {
    try {
      const jobs = await this.jobService.getAllJobs();
      
      res.json({
        success: true,
        data: jobs.map(job => job.toObject()),
      });
    } catch (error) {
      logger.error('Failed to get all jobs', { error: error.message });
      next(error);
    }
  };

  getJobsByStatus = async (req, res, next) => {
    try {
      const { status } = req.params;
      const jobs = await this.jobService.getJobsByStatus(status);
      
      res.json({
        success: true,
        data: jobs.map(job => job.toObject()),
      });
    } catch (error) {
      logger.error(`Failed to get jobs by status ${req.params.status}`, { error: error.message });
      next(error);
    }
  };
}

module.exports = JobController;