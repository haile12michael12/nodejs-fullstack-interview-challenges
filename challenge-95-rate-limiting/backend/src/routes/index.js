const express = require('express');
const router = express.Router();
const rateLimitRoutes = require('./rateLimitRoutes');

// Main routes
router.get('/', (req, res) => {
  res.json({ message: 'Rate Limiting API' });
});

router.use('/api/rate-limit', rateLimitRoutes);

module.exports = router;