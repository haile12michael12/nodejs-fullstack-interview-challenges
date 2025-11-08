const express = require('express');
const LogController = require('../controllers/log.controller');

const router = express.Router();
const logController = new LogController();

/**
 * @route GET /logs/requests
 * @desc Get all request logs
 * @param {string} method - Filter by HTTP method
 * @param {number} status - Filter by HTTP status code
 * @param {string} url - Filter by URL substring
 * @returns {object} 200 - Array of request logs
 */
router.get('/requests', logController.getLogs);

/**
 * @route GET /logs/requests/:id
 * @desc Get a specific request log by ID
 * @param {number} id - Log ID
 * @returns {object} 200 - Request log object
 */
router.get('/requests/:id', logController.getLogById);

/**
 * @route POST /logs/search
 * @desc Search logs by criteria
 * @returns {object} 200 - Array of matching request logs
 */
router.post('/search', logController.searchLogs);

/**
 * @route GET /logs/stats
 * @desc Get log statistics
 * @returns {object} 200 - Log statistics
 */
router.get('/stats', logController.getStats);

/**
 * @route GET /logs/performance
 * @desc Get performance data
 * @returns {object} 200 - Performance data
 */
router.get('/performance', logController.getPerformance);

module.exports = router;