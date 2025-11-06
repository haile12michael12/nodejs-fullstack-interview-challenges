class IJobQueueRepository {
  async addJob(jobData) {
    throw new Error('Method not implemented');
  }

  async getJob(jobId) {
    throw new Error('Method not implemented');
  }

  async getJobsByStatus(status) {
    throw new Error('Method not implemented');
  }

  async updateJobStatus(jobId, status) {
    throw new Error('Method not implemented');
  }

  async processJob(jobId, handler) {
    throw new Error('Method not implemented');
  }
}

module.exports = IJobQueueRepository;