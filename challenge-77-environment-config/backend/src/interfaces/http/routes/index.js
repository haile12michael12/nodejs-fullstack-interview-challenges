const express = require('express');
const HealthController = require('../controllers/health.controller');

const router = express.Router();
const healthController = new HealthController();

// Health check routes
router.get('/health', healthController.getHealth);
router.get('/config', healthController.getConfig);
router.get('/environment', healthController.getEnvironment);

module.exports = router;