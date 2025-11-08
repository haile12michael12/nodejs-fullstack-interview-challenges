const { v4: uuidv4 } = require('uuid');
const { successResponse, notFoundResponse, errorResponse } = require('../../utils/response');
const logger = require('../../utils/logger');

// In-memory storage for products (in a real app, this would be a database)
let products = [
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Product 1',
    price: 99.99,
    description: 'Product 1 description',
    createdAt: new Date().toISOString()
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Product 2',
    price: 149.99,
    description: 'Product 2 description',
    createdAt: new Date().toISOString()
  }
];

/**
 * Get all products
 * @route GET /products
 * @group Products - Operations about products
 * @returns {Array.<Product>} 200 - An array of products
 * @returns {Error} 500 - Internal server error
 */
const getAllProducts = (req, res) => {
  try {
    logger.info('Fetching all products');
    return successResponse(res, products, 'Products retrieved successfully');
  } catch (error) {
    logger.error('Error fetching products', error);
    return errorResponse(res, error, 'Failed to retrieve products');
  }
};

/**
 * Get product by ID
 * @route GET /products/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - Product ID
 * @returns {Product.model} 200 - Product object
 * @returns {Error} 404 - Product not found
 * @returns {Error} 500 - Internal server error
 */
const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return notFoundResponse(res, 'Product not found');
    }
    
    logger.info(`Fetching product with ID: ${id}`);
    return successResponse(res, product, 'Product retrieved successfully');
  } catch (error) {
    logger.error('Error fetching product', error);
    return errorResponse(res, error, 'Failed to retrieve product');
  }
};

/**
 * Create a new product
 * @route POST /products
 * @group Products - Operations about products
 * @param {Product.model} product.body.required - Product object
 * @returns {Product.model} 201 - Created product object
 * @returns {Error} 400 - Validation error
 * @returns {Error} 500 - Internal server error
 */
const createProduct = (req, res) => {
  try {
    const { name, price, description } = req.body;
    
    // Create new product
    const newProduct = {
      id: uuidv4(),
      name,
      price,
      description,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    
    logger.info(`Created product with ID: ${newProduct.id}`);
    return successResponse(res, newProduct, 'Product created successfully', 201);
  } catch (error) {
    logger.error('Error creating product', error);
    return errorResponse(res, error, 'Failed to create product');
  }
};

/**
 * Update product
 * @route PUT /products/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - Product ID
 * @param {Product.model} product.body.required - Product object
 * @returns {Product.model} 200 - Updated product object
 * @returns {Error} 404 - Product not found
 * @returns {Error} 500 - Internal server error
 */
const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return notFoundResponse(res, 'Product not found');
    }
    
    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      price: price !== undefined ? price : products[productIndex].price,
      description: description || products[productIndex].description
    };
    
    logger.info(`Updated product with ID: ${id}`);
    return successResponse(res, products[productIndex], 'Product updated successfully');
  } catch (error) {
    logger.error('Error updating product', error);
    return errorResponse(res, error, 'Failed to update product');
  }
};

/**
 * Delete product
 * @route DELETE /products/{id}
 * @group Products - Operations about products
 * @param {string} id.path.required - Product ID
 * @returns {object} 200 - Success message
 * @returns {Error} 404 - Product not found
 * @returns {Error} 500 - Internal server error
 */
const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return notFoundResponse(res, 'Product not found');
    }
    
    // Remove product
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    logger.info(`Deleted product with ID: ${id}`);
    return successResponse(res, deletedProduct, 'Product deleted successfully');
  } catch (error) {
    logger.error('Error deleting product', error);
    return errorResponse(res, error, 'Failed to delete product');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};