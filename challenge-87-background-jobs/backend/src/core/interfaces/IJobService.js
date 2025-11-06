class IJobService {
  async createJob(type, payload) {
    throw new Error('Method not implemented');
  }

  async getJobById(id) {
    throw new Error('Method not implemented');
  }

  async getAllJobs() {
    throw new Error('Method not implemented');
  }

  async getJobsByStatus(status) {
    throw new Error('Method not implemented');
  }

  async updateJobStatus(id, status) {
    throw new Error('Method not implemented');
  }
}

module.exports = IJobService;