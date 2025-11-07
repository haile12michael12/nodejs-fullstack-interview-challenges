const SearchService = require('./search.service');
const { createSuccessResponse, createPaginatedResponse } = require('../../core/http/response');
const logger = require('../../core/utils/logger');

class SearchController {
  constructor() {
    this.searchService = new SearchService();
  }

  search = async (req, res) => {
    try {
      const result = await this.searchService.searchItems(req.query);
      
      logger.info('Search completed successfully');
      res.json(createPaginatedResponse(result, result));
    } catch (error) {
      logger.error('Error in search controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform search',
        error: error.message,
      });
    }
  };

  advancedSearch = async (req, res) => {
    try {
      const result = await this.searchService.advancedSearch(req.body);
      
      logger.info('Advanced search completed successfully');
      res.json(createSuccessResponse(result.items, 'Advanced search completed', {
        total: result.total,
      }));
    } catch (error) {
      logger.error('Error in advanced search controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform advanced search',
        error: error.message,
      });
    }
  };
}

module.exports = SearchController;