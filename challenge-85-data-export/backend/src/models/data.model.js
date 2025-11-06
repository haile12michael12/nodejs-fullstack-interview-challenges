// Mock data model - in a real application, this would connect to a database
class DataModel {
  constructor() {
    // Sample data for demonstration
    this.data = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, department: 'Marketing' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Sales' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, department: 'Engineering' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, department: 'HR' },
    ];
  }

  async findAll(filters = {}) {
    // In a real implementation, this would query the database with filters
    let results = [...this.data];
    
    // Apply filters if provided
    if (filters.department) {
      results = results.filter(item => item.department === filters.department);
    }
    
    if (filters.minAge) {
      results = results.filter(item => item.age >= parseInt(filters.minAge));
    }
    
    if (filters.maxAge) {
      results = results.filter(item => item.age <= parseInt(filters.maxAge));
    }
    
    return results;
  }

  async count(filters = {}) {
    const results = await this.findAll(filters);
    return results.length;
  }

  async streamData(filters = {}, stream) {
    const results = await this.findAll(filters);
    
    for (const item of results) {
      stream.write(JSON.stringify(item) + '\n');
    }
    
    stream.end();
  }
}

module.exports = DataModel;