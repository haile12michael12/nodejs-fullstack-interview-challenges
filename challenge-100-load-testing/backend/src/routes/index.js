const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Root endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Load Testing API Server' });
});

module.exports = router;