const ExportJob = require('../models/exportJob.model');

class ExportJobRepository {
  constructor() {
    this.model = new ExportJob();
  }

  async create(data) {
    return this.model.createJob(data);
  }

  async findById(id) {
    return this.model.getJob(id);
  }

  async update(id, updates) {
    return this.model.updateJob(id, updates);
  }

  async delete(id) {
    return this.model.deleteJob(id);
  }

  async findAll() {
    return this.model.getAllJobs();
  }
}

module.exports = ExportJobRepository;