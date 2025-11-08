const express = require('express');
const userRoutes = require('../modules/users/user.routes');
const productRoutes = require('../modules/products/product.routes');

const router = express.Router();

// Register all module routes
router.use('/users', userRoutes);
router.use('/products', productRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;