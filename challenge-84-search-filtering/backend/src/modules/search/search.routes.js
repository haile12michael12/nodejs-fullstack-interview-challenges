const express = require('express');
const SearchController = require('./search.controller');
const { validateSearch, validateAdvancedSearch } = require('../../core/middleware/validateRequest');

const router = express.Router();
const searchController = new SearchController();

/**
 * @route GET /search
 * @desc Search items with query, filters, and sorting
 * @param {string} q - Search query
 * @param {object} filter - Field filters
 * @param {string} sort - Sort field
 * @param {string} order - Sort order (asc|desc)
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {object} 200 - Search results with pagination
 */
router.get('/', validateSearch, searchController.search);

/**
 * @route POST /search/advanced
 * @desc Advanced search with multiple criteria
 * @returns {object} 200 - Search results
 */
router.post('/advanced', validateAdvancedSearch, searchController.advancedSearch);

module.exports = router;