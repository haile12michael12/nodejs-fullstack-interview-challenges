const db = require('../../config/db');
const logger = require('../../core/utils/logger');

class SearchRepository {
  async searchItems(query) {
    try {
      logger.info('Searching items with query:', query);
      return await db.searchItems(query);
    } catch (error) {
      logger.error('Error searching items:', error);
      throw error;
    }
  }

  async advancedSearch(criteria) {
    try {
      logger.info('Advanced search with criteria:', criteria);
      return await db.advancedSearch(criteria);
    } catch (error) {
      logger.error('Error in advanced search:', error);
      throw error;
    }
  }
}

module.exports = SearchRepository;