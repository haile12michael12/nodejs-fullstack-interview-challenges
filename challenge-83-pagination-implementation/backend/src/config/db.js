// Mock database implementation - in a real application, this would connect to a real database
class MockDatabase {
  constructor() {
    // Generate sample data
    this.items = [];
    for (let i = 1; i <= 1000; i++) {
      this.items.push({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i}`,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(),
      });
    }
  }

  // Simulate database query with pagination
  async findItems(query = {}) {
    const { page = 1, limit = 10, offset = 0, after, before } = query;
    
    // For offset-based pagination
    if (!after && !before) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const items = this.items.slice(startIndex, endIndex);
      const total = this.items.length;
      
      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }
    
    // For cursor-based pagination (simplified)
    let startIndex = 0;
    if (after) {
      const afterId = parseInt(Buffer.from(after, 'base64').toString('ascii'));
      startIndex = this.items.findIndex(item => item.id > afterId);
    } else if (before) {
      const beforeId = parseInt(Buffer.from(before, 'base64').toString('ascii'));
      startIndex = this.items.findIndex(item => item.id < beforeId) - limit;
      startIndex = Math.max(0, startIndex);
    }
    
    const endIndex = startIndex + limit;
    const items = this.items.slice(startIndex, endIndex);
    const total = this.items.length;
    
    // Create cursors
    const hasNextPage = endIndex < total;
    const hasPreviousPage = startIndex > 0;
    
    const cursors = {
      hasNextPage,
      hasPreviousPage,
    };
    
    if (hasNextPage && items.length > 0) {
      const lastItem = items[items.length - 1];
      cursors.endCursor = Buffer.from(lastItem.id.toString()).toString('base64');
    }
    
    if (hasPreviousPage && items.length > 0) {
      const firstItem = items[0];
      cursors.startCursor = Buffer.from(firstItem.id.toString()).toString('base64');
    }
    
    return {
      items,
      total,
      cursors,
    };
  }

  async countItems() {
    return this.items.length;
  }
}

module.exports = new MockDatabase();