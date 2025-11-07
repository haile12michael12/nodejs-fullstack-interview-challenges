const express = require('express');
const searchRoutes = require('../modules/search/search.routes');

const router = express.Router();

// Register all module routes
router.use('/search', searchRoutes);

module.exports = router;