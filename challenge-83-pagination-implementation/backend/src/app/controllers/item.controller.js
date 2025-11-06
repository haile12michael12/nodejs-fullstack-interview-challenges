const ItemService = require('../services/item.service');
const { createSuccessResponse, createPaginationMetadata } = require('../../utils/response.util');
const logger = require('../../utils/logger.util');

class ItemController {
  constructor() {
    this.itemService = new ItemService();
  }

  getItems = async (req, res) => {
    try {
      const result = await this.itemService.getItems(req.query);
      
      const response = {
        ...createSuccessResponse(result.items),
        meta: createPaginationMetadata(result),
      };
      
      logger.info('Items retrieved successfully');
      res.json(response);
    } catch (error) {
      logger.error('Error retrieving items:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve items',
        error: error.message,
      });
    }
  };

  getItemCount = async (req, res) => {
    try {
      const count = await this.itemService.getItemCount();
      
      logger.info('Item count retrieved successfully');
      res.json(createSuccessResponse({ count }, 'Item count retrieved successfully'));
    } catch (error) {
      logger.error('Error retrieving item count:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve item count',
        error: error.message,
      });
    }
  };
}

module.exports = ItemController;