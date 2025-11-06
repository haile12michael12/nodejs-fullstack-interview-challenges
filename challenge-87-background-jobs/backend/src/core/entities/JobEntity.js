class JobEntity {
  constructor(id, type, payload, status, createdAt, updatedAt) {
    this.id = id;
    this.type = type;
    this.payload = payload;
    this.status = status || 'pending';
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static fromObject(obj) {
    return new JobEntity(
      obj.id,
      obj.type,
      obj.payload,
      obj.status,
      obj.createdAt,
      obj.updatedAt
    );
  }

  toObject() {
    return {
      id: this.id,
      type: this.type,
      payload: this.payload,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateStatus(status) {
    this.status = status;
    this.updatedAt = new Date();
  }
}

module.exports = JobEntity;