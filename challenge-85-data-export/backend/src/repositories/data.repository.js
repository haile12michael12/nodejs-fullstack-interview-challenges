const DataModel = require('../models/data.model');

class DataRepository {
  constructor() {
    this.model = new DataModel();
  }

  async findAll(filters = {}) {
    return await this.model.findAll(filters);
  }

  async count(filters = {}) {
    return await this.model.count(filters);
  }

  async streamData(filters = {}, stream) {
    return await this.model.streamData(filters, stream);
  }
}

module.exports = DataRepository;