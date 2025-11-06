const { v4: uuidv4 } = require('uuid');

class ExportJob {
  constructor() {
    this.jobs = new Map(); // In a real application, this would be stored in a database
  }

  createJob(data) {
    const id = uuidv4();
    const job = {
      id,
      ...data,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.jobs.set(id, job);
    return job;
  }

  getJob(id) {
    return this.jobs.get(id);
  }

  updateJob(id, updates) {
    const job = this.jobs.get(id);
    if (job) {
      Object.assign(job, updates, { updatedAt: new Date() });
      this.jobs.set(id, job);
      return job;
    }
    return null;
  }

  deleteJob(id) {
    return this.jobs.delete(id);
  }

  getAllJobs() {
    return Array.from(this.jobs.values());
  }
}

module.exports = ExportJob;