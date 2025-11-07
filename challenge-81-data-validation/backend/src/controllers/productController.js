const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct } = require('../models/productModel');

// Create a new product
const create = (req, res) => {
  try {
    const productData = req.body;
    const newProduct = createProduct(productData);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// Get product by ID
const getById = (req, res) => {
  try {
    const { id } = req.params;
    const product = getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product',
      error: error.message
    });
  }
};

// Get all products
const getAll = (req, res) => {
  try {
    const products = getAllProducts();
    
    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      meta: {
        count: products.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message
    });
  }
};

// Update product
const update = (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    
    const updatedProduct = updateProduct(id, productData);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Delete product
const remove = (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// Validate product data without saving
const validate = (req, res) => {
  try {
    const productData = req.body;
    const validation = require('../models/productModel').Product.validate(productData);
    
    if (validation.isValid) {
      return res.json({
        success: true,
        message: 'Product data is valid',
        data: productData
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Product data validation failed',
      errors: validation.errors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to validate product data',
      error: error.message
    });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove,
  validate
};