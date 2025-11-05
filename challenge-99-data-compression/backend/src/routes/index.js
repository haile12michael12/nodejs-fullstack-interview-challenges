const express = require('express');
const router = express.Router();
const compressionRoutes = require('./compression.routes');

router.use('/api/compression', compressionRoutes);

// Root endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Data Compression API' });
});

module.exports = router;