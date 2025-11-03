const http = require('http');
const url = require('url');
const { Product } = require('./src/models/Product');
const { createXmlElement, createXmlDocument } = require('./src/utils/xml');

const PORT = process.env.PORT || 3000;

// Helper function to send XML response
function sendXmlResponse(res, statusCode, xmlData) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'no-cache'
  });
  res.end(xmlData);
}

// Helper function to send error response
function sendError(res, statusCode, message) {
  const errorXml = createXmlDocument(
    createXmlElement('error', {
      code: statusCode,
      message: message
    })
  );
  sendXmlResponse(res, statusCode, errorXml);
}

// Parse XML body
function parseXmlBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        // Simple XML parsing for product data
        const productData = {};
        
        // Extract name
        const nameMatch = body.match(/<name>([^<]*)<\/name>/);
        if (nameMatch) productData.name = nameMatch[1];
        
        // Extract price
        const priceMatch = body.match(/<price>([^<]*)<\/price>/);
        if (priceMatch) productData.price = parseFloat(priceMatch[1]);
        
        // Extract description
        const descMatch = body.match(/<description>([^<]*)<\/description>/);
        if (descMatch) productData.description = descMatch[1];
        
        // Extract category
        const categoryMatch = body.match(/<category>([^<]*)<\/category>/);
        if (categoryMatch) productData.category = categoryMatch[1];
        
        resolve(productData);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Create XML for single product
function createProductXml(product) {
  return createXmlElement('product', {
    id: product.id,
    name: product.name,
    price: product.price.toFixed(2),
    description: product.description,
    category: product.category,
    created_at: new Date().toISOString()
  });
}

// Create XML for product list
function createProductsXml(products) {
  const productsXml = products.map(product => createProductXml(product)).join('');
  return createXmlDocument(
    createXmlElement('products', productsXml)
  );
}

// Route handlers
async function handleGetProducts(req, res) {
  try {
    const products = Product.findAll();
    const xml = createProductsXml(products);
    sendXmlResponse(res, 200, xml);
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
}

async function handleGetProductById(req, res, id) {
  try {
    const product = Product.findById(id);
    if (!product) {
      return sendError(res, 404, 'Product not found');
    }
    
    const xml = createXmlDocument(createProductXml(product));
    sendXmlResponse(res, 200, xml);
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
}

async function handleCreateProduct(req, res) {
  try {
    const productData = await parseXmlBody(req);
    
    if (!productData.name || !productData.price) {
      return sendError(res, 400, 'Name and price are required');
    }
    
    const product = Product.create(productData);
    const xml = createXmlDocument(createProductXml(product));
    sendXmlResponse(res, 201, xml);
  } catch (error) {
    sendError(res, 400, 'Invalid XML or missing required fields');
  }
}

async function handleUpdateProduct(req, res, id) {
  try {
    const productData = await parseXmlBody(req);
    const product = Product.update(id, productData);
    
    if (!product) {
      return sendError(res, 404, 'Product not found');
    }
    
    const xml = createXmlDocument(createProductXml(product));
    sendXmlResponse(res, 200, xml);
  } catch (error) {
    sendError(res, 400, 'Invalid XML');
  }
}

async function handleDeleteProduct(req, res, id) {
  try {
    const deleted = Product.delete(id);
    if (!deleted) {
      return sendError(res, 404, 'Product not found');
    }
    
    const successXml = createXmlDocument(
      createXmlElement('response', {
        message: 'Product deleted successfully'
      })
    );
    sendXmlResponse(res, 200, successXml);
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
}

// Main server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${pathname}`);

  try {
    // CORS headers for frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // API routes
    if (pathname === '/api/products' && method === 'GET') {
      return await handleGetProducts(req, res);
    }

    if (pathname === '/api/products' && method === 'POST') {
      return await handleCreateProduct(req, res);
    }

    // Product by ID routes
    const productMatch = pathname.match(/^\/api\/products\/(\d+)$/);
    if (productMatch) {
      const productId = productMatch[1];
      
      switch (method) {
        case 'GET':
          return await handleGetProductById(req, res, productId);
        case 'PUT':
          return await handleUpdateProduct(req, res, productId);
        case 'DELETE':
          return await handleDeleteProduct(req, res, productId);
        default:
          return sendError(res, 405, 'Method not allowed');
      }
    }

    // Default 404
    sendError(res, 404, 'Not found');

  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`Legacy XML API server running on port ${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /api/products - Get all products`);
  console.log(`  POST /api/products - Create new product`);
  console.log(`  GET /api/products/{id} - Get product by ID`);
  console.log(`  PUT /api/products/{id} - Update product by ID`);
  console.log(`  DELETE /api/products/{id} - Delete product by ID`);
  console.log(`\nAll requests and responses use Content-Type: application/xml`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});