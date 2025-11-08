const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('./product.controller');
const { authenticate, authorize } = require('../../middleware/auth');
const { validateBody, validateParams } = require('../../middleware/validate');

const router = express.Router();

/**
 * @route GET /api/products
 * @group Products - Operations about products
 * @returns {Array.<Product>} 200 - An array of products
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.get('/', authenticate, authorize(), getAllProducts);

/**
 * @route GET /api/products/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - Product ID
 * @returns {Product.model} 200 - Product object
 * @returns {Error} 404 - Product not found
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.get('/:id', authenticate, authorize(), validateParams(['id']), getProductById);

/**
 * @route POST /api/products
 * @group Products - Operations about products
 * @param {Product.model} product.body.required - Product object
 * @returns {Product.model} 201 - Created product object
 * @returns {Error} 400 - Validation error
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.post('/', authenticate, authorize(), validateBody(['name', 'price']), createProduct);

/**
 * @route PUT /api/products/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - Product ID
 * @param {Product.model} product.body.required - Product object
 * @returns {Product.model} 200 - Updated product object
 * @returns {Error} 404 - Product not found
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.put('/:id', authenticate, authorize(), validateParams(['id']), validateBody(['name', 'price']), updateProduct);

/**
 * @route DELETE /api/products/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - Product ID
 * @returns {object} 200 - Success message
 * @returns {Error} 404 - Product not found
 * @returns {Error} 500 - Internal server error
 * @security JWT
 */
router.delete('/:id', authenticate, authorize(), validateParams(['id']), deleteProduct);

module.exports = router;