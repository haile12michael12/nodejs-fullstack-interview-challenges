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
        category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
        price: Math.floor(Math.random() * 1000) + 1,
        tags: [`tag${Math.floor(Math.random() * 10)}`, `tag${Math.floor(Math.random() * 10)}`],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(),
      });
    }
  }

  // Search items with filters, sorting, and pagination
  async searchItems(query = {}) {
    const {
      q = '',
      filter = {},
      sort = 'id',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    let results = [...this.items];

    // Apply search query
    if (q && q.length >= 3) {
      const searchTerm = q.toLowerCase();
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        results = results.filter(item => {
          if (Array.isArray(item[key])) {
            return item[key].some(val => val.toString().toLowerCase().includes(filter[key].toLowerCase()));
          }
          return item[key] && item[key].toString().toLowerCase().includes(filter[key].toLowerCase());
        });
      }
    });

    // Apply sorting
    results.sort((a, b) => {
      const aVal = a[sort];
      const bVal = b[sort];
      
      if (order === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      items: paginatedResults,
      total: results.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(results.length / limit),
    };
  }

  // Advanced search with multiple criteria
  async advancedSearch(criteria = {}) {
    const {
      name,
      description,
      category,
      minPrice,
      maxPrice,
      tags,
      ...rest
    } = criteria;

    let results = [...this.items];

    // Apply name filter
    if (name) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Apply description filter
    if (description) {
      results = results.filter(item => 
        item.description.toLowerCase().includes(description.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      results = results.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply price range filters
    if (minPrice !== undefined) {
      results = results.filter(item => item.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      results = results.filter(item => item.price <= maxPrice);
    }

    // Apply tags filter
    if (tags && Array.isArray(tags) && tags.length > 0) {
      results = results.filter(item => 
        tags.every(tag => item.tags.includes(tag))
      );
    }

    return {
      items: results,
      total: results.length,
    };
  }
}

module.exports = new MockDatabase();