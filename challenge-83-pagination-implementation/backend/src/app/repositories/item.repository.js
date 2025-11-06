const db = require('../../config/db');
const logger = require('../../utils/logger.util');

class ItemRepository {
  async findItems(query) {
    try {
      logger.info('Finding items with query:', query);
      return await db.findItems(query);
    } catch (error) {
      logger.error('Error finding items:', error);
      throw error;
    }
  }

  async countItems() {
    try {
      logger.info('Counting items');
      return await db.countItems();
    } catch (error) {
      logger.error('Error counting items:', error);
      throw error;
    }
  }
}

module.exports = ItemRepository;