const ExportJobRepository = require('../repositories/exportJob.repository');

class ProgressService {
  constructor() {
    this.exportJobRepository = new ExportJobRepository();
  }

  async createExportJob(data) {
    return await this.exportJobRepository.create(data);
  }

  async getExportJob(id) {
    return await this.exportJobRepository.findById(id);
  }

  async updateExportJob(id, updates) {
    return await this.exportJobRepository.update(id, updates);
  }

  async deleteExportJob(id) {
    return await this.exportJobRepository.delete(id);
  }

  async getAllExportJobs() {
    return await this.exportJobRepository.findAll();
  }

  async updateProgress(id, progress, status = 'processing') {
    return await this.updateExportJob(id, {
      progress,
      status,
    });
  }

  async markAsCompleted(id, result) {
    return await this.updateExportJob(id, {
      status: 'completed',
      progress: 100,
      result,
      completedAt: new Date(),
    });
  }

  async markAsFailed(id, error) {
    return await this.updateExportJob(id, {
      status: 'failed',
      error: error.message,
      completedAt: new Date(),
    });
  }
}

module.exports = ProgressService;