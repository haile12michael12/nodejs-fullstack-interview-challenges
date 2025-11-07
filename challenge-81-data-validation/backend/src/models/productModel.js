// Mock product model (in a real application, this would connect to a database)
const { v4: uuidv4 } = require('uuid');

class Product {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.category = data.category;
    this.inStock = data.inStock !== undefined ? data.inStock : true;
    this.tags = data.tags || [];
    this.specifications = data.specifications;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validate product data
  static validate(productData) {
    // In a real application, this would use the Joi schema
    const errors = [];
    
    if (!productData.name || productData.name.length < 3) {
      errors.push('Product name is required and must be at least 3 characters');
    }
    
    if (!productData.price || productData.price < 0) {
      errors.push('Price must be a positive number');
    }
    
    const validCategories = ['electronics', 'clothing', 'books', 'home', 'sports'];
    if (!productData.category || !validCategories.includes(productData.category)) {
      errors.push('Category must be one of: electronics, clothing, books, home, sports');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format product data
  static format(productData) {
    return {
      id: productData.id || uuidv4(),
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price).toFixed(2),
      category: productData.category,
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      tags: productData.tags || [],
      specifications: productData.specifications,
      createdAt: productData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

// Mock database storage
const products = [];

// Model methods
const createProduct = (productData) => {
  const formattedProduct = Product.format(productData);
  products.push(formattedProduct);
  return formattedProduct;
};

const getProductById = (id) => {
  return products.find(product => product.id === id);
};

const getAllProducts = () => {
  return products;
};

const updateProduct = (id, productData) => {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return null;
  
  const updatedProduct = { ...products[index], ...productData, id, updatedAt: new Date().toISOString() };
  products[index] = updatedProduct;
  return updatedProduct;
};

const deleteProduct = (id) => {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return false;
  
  products.splice(index, 1);
  return true;
};

module.exports = {
  Product,
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
};