const { escapeXml, createXmlElement, createXmlDocument } = require('../src/utils/xml');

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

// Create error XML response
function createErrorXml(statusCode, message) {
  const errorXml = createXmlDocument(
    createXmlElement('error', {
      code: statusCode,
      message: message
    })
  );
  return errorXml;
}

// Create success response XML
function createSuccessXml(message) {
  const successXml = createXmlDocument(
    createXmlElement('response', {
      message: message
    })
  );
  return successXml;
}

module.exports = {
  createProductXml,
  createProductsXml,
  createErrorXml,
  createSuccessXml
};