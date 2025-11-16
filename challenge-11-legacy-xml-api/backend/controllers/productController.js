const fs = require('fs');
const path = require('path');
const { parseXmlBody } = require('../xml/xmlParser');
const { validateProductXml } = require('../xml/xmlValidator');
const { createProductXml, createProductsXml } = require('../xml/xmlBuilder');
const { sendXmlResponse, sendError, sendSuccess } = require('../utils/httpHelpers');

// Path to the products data file
const DATA_FILE = path.join(__dirname, '../data/products.json');

// Load products from file
function loadProducts() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save products to file
function saveProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
}

// Get all products
async function getProducts(req, res) {
  try {
    const products = loadProducts();
    const xml = createProductsXml(products);
    sendXmlResponse(res, 200, xml);
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
}

// Get product by ID
async function getProductById(req, res, id) {
  try {
    const products = loadProducts();
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
      return sendError(res, 404, 'Product not found');
    }
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
${createProductXml(product)}`;
    sendXmlResponse(res, 200, xml);
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
}

// Create new product
async function createProduct(req, res) {
  try {
    const productData = await parseXmlBody(req);
    
    // Validate the product data
    const validation = validateProductXml(req.body);
    if (!validation.valid) {
      return sendError(res, 400, validation.error);
    }
    
    if (!productData.name || !productData.price) {
      return sendError(res, 400, 'Name and price are required');
    }
    
    // Load existing products
    let products = loadProducts();
    
    // Generate new ID
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    // Create new product
    const product = {
      id,
      name: productData.name,
      price: parseFloat(productData.price),
      description: productData.description || '',
      category: productData.category || 'General'
    };
    
    // Add to products array
    products.push(product);
    
    // Save to file
    saveProducts(products);
    
    // Return created product
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
${createProductXml(product)}`;
    sendXmlResponse(res, 201, xml);
  } catch (error) {
    sendError(res, 400, 'Invalid XML or missing required fields');
  }
}

// Update product
async function updateProduct(req, res, id) {
  try {
    const productData = await parseXmlBody(req);
    
    // Load existing products
    let products = loadProducts();
    
    // Find product index
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return sendError(res, 404, 'Product not found');
    }
    
    // Update product fields
    if (productData.name !== undefined) products[index].name = productData.name;
    if (productData.price !== undefined) products[index].price = parseFloat(productData.price);
    if (productData.description !== undefined) products[index].description = productData.description;
    if (productData.category !== undefined) products[index].category = productData.category;
    
    // Save to file
    saveProducts(products);
    
    // Return updated product
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
${createProductXml(products[index])}`;
    sendXmlResponse(res, 200, xml);
  } catch (error) {
    sendError(res, 400, 'Invalid XML');
  }
}

// Delete product
async function deleteProduct(req, res, id) {
  try {
    // Load existing products
    let products = loadProducts();
    
    // Find product index
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return sendError(res, 404, 'Product not found');
    }
    
    // Remove product
    products.splice(index, 1);
    
    // Save to file
    saveProducts(products);
    
    sendSuccess(res, 'Product deleted successfully');
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};