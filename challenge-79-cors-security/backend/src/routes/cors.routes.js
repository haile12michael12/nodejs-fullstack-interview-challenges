const express = require('express');
const CorsController = require('../controllers/cors.controller');

const router = express.Router();
const corsController = new CorsController();

/**
 * @route GET /cors/config
 * @desc Get current CORS configuration
 * @access Public
 */
router.get('/config', corsController.getConfig);

/**
 * @route POST /cors/update
 * @desc Update CORS configuration
 * @access Public
 */
router.post('/update', corsController.updateConfig);

/**
 * @route GET /cors/origins
 * @desc Get allowed origins
 * @access Public
 */
router.get('/origins', corsController.getAllowedOrigins);

/**
 * @route POST /cors/origins/add
 * @desc Add origin to whitelist
 * @access Public
 */
router.post('/origins/add', corsController.addOrigin);

/**
 * @route POST /cors/origins/remove
 * @desc Remove origin from whitelist
 * @access Public
 */
router.post('/origins/remove', corsController.removeOrigin);

module.exports = router;