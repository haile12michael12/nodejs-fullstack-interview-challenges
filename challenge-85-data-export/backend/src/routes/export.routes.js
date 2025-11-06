const express = require('express');
const ExportController = require('../controllers/export.controller');

const router = express.Router();
const exportController = new ExportController();

/**
 * @route GET /export
 * @desc Export data in specified format
 * @param {string} format - Export format (csv, json, excel)
 * @returns {object} 200 - Exported data as file
 */
router.get('/', exportController.exportData);

/**
 * @route POST /export/advanced
 * @desc Create advanced export job with filters
 * @returns {object} 202 - Export job created
 */
router.post('/advanced', exportController.advancedExport);

/**
 * @route GET /export/status/:id
 * @desc Get export job status
 * @param {string} id - Export job ID
 * @returns {object} 200 - Export job status
 */
router.get('/status/:id', exportController.getExportStatus);

module.exports = router;