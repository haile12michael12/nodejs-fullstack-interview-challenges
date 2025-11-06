const express = require('express');
const ItemController = require('../controllers/item.controller');
const { validatePagination } = require('../validators/pagination.validator');

const router = express.Router();
const itemController = new ItemController();

/**
 * @route GET /items
 * @desc Get paginated items
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10, max: 100)
 * @param {string} after - Cursor for forward pagination
 * @param {string} before - Cursor for backward pagination
 * @returns {object} 200 - Paginated items with metadata
 */
router.get('/', validatePagination, itemController.getItems);

/**
 * @route GET /items/count
 * @desc Get total item count
 * @returns {object} 200 - Total item count
 */
router.get('/count', itemController.getItemCount);

module.exports = router;