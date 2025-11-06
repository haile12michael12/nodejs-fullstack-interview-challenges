const ItemRepository = require('../repositories/item.repository');
const { pagination } = require('../../config/env');
const { decodeCursor } = require('../../utils/cursor.util');
const logger = require('../../utils/logger.util');

class ItemService {
  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async getItems(query) {
    try {
      const { page = 1, limit = pagination.defaultLimit, after, before } = query;
      
      // Validate limit
      const validatedLimit = Math.min(limit, pagination.maxLimit);
      
      const dbQuery = {
        page: parseInt(page),
        limit: validatedLimit,
      };
      
      // Handle cursor-based pagination
      if (after) {
        dbQuery.after = after;
      } else if (before) {
        dbQuery.before = before;
      }
      
      logger.info('Getting items with query:', dbQuery);
      const result = await this.itemRepository.findItems(dbQuery);
      
      return result;
    } catch (error) {
      logger.error('Error getting items:', error);
      throw error;
    }
  }

  async getItemCount() {
    try {
      logger.info('Getting item count');
      return await this.itemRepository.countItems();
    } catch (error) {
      logger.error('Error getting item count:', error);
      throw error;
    }
  }
}

module.exports = ItemService;