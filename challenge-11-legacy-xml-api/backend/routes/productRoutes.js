const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

function productRoutes(req, res, pathname, method) {
  // API routes
  if (pathname === '/api/products' && method === 'GET') {
    return getProducts(req, res);
  }

  if (pathname === '/api/products' && method === 'POST') {
    return createProduct(req, res);
  }

  // Product by ID routes
  const productMatch = pathname.match(/^\/api\/products\/(\d+)$/);
  if (productMatch) {
    const productId = productMatch[1];
    
    switch (method) {
      case 'GET':
        return getProductById(req, res, productId);
      case 'PUT':
        return updateProduct(req, res, productId);
      case 'DELETE':
        return deleteProduct(req, res, productId);
      default:
        res.writeHead(405, { 'Content-Type': 'application/xml' });
        res.end(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>405</code>
  <message>Method not allowed</message>
</error>`);
        return true;
    }
  }
  
  // Return false to indicate route not handled
  return false;
}

module.exports = productRoutes;