const SearchRepository = require('./search.repository');
const { sanitizeQuery } = require('../../core/utils/sanitizer');
const logger = require('../../core/utils/logger');

class SearchService {
  constructor() {
    this.searchRepository = new SearchRepository();
  }

  async searchItems(query) {
    try {
      // Sanitize query parameters
      const sanitizedQuery = sanitizeQuery(query);
      
      logger.info('Performing search with sanitized query:', sanitizedQuery);
      const result = await this.searchRepository.searchItems(sanitizedQuery);
      
      return result;
    } catch (error) {
      logger.error('Error in search service:', error);
      throw error;
    }
  }

  async advancedSearch(criteria) {
    try {
      // Sanitize search criteria
      const sanitizedCriteria = sanitizeQuery(criteria);
      
      logger.info('Performing advanced search with criteria:', sanitizedCriteria);
      const result = await this.searchRepository.advancedSearch(sanitizedCriteria);
      
      return result;
    } catch (error) {
      logger.error('Error in advanced search service:', error);
      throw error;
    }
  }
}

module.exports = SearchService;