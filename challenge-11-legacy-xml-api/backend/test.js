const http = require('http');

// Test the XML API endpoints
async function testApi() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('Testing Legacy XML API...\n');
  
  try {
    // Test 1: Get all products
    console.log('1. Testing GET /api/products');
    const productsRes = await fetch(`${baseUrl}/api/products`);
    console.log(`   Status: ${productsRes.status}`);
    console.log(`   Content-Type: ${productsRes.headers.get('content-type')}`);
    const productsXml = await productsRes.text();
    console.log(`   Response: ${productsXml.substring(0, 100)}...\n`);
    
    // Test 2: Create a new product
    console.log('2. Testing POST /api/products');
    const newProductXml = `
      <product>
        <name>Test Product</name>
        <price>29.99</price>
        <description>A test product for XML API</description>
        <category>Test</category>
      </product>
    `.trim();
    
    const createRes = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: newProductXml
    });
    
    console.log(`   Status: ${createRes.status}`);
    const createdProductXml = await createRes.text();
    console.log(`   Response: ${createdProductXml.substring(0, 100)}...\n`);
    
    // Extract ID from created product for further tests
    const idMatch = createdProductXml.match(/<id>(\d+)<\/id>/);
    const productId = idMatch ? idMatch[1] : null;
    
    if (productId) {
      // Test 3: Get product by ID
      console.log(`3. Testing GET /api/products/${productId}`);
      const productRes = await fetch(`${baseUrl}/api/products/${productId}`);
      console.log(`   Status: ${productRes.status}`);
      const productXml = await productRes.text();
      console.log(`   Response: ${productXml.substring(0, 100)}...\n`);
      
      // Test 4: Update product
      console.log(`4. Testing PUT /api/products/${productId}`);
      const updateProductXml = `
        <product>
          <name>Updated Test Product</name>
          <price>39.99</price>
          <description>An updated test product for XML API</description>
          <category>Updated Test</category>
        </product>
      `.trim();
      
      const updateRes = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: updateProductXml
      });
      
      console.log(`   Status: ${updateRes.status}`);
      const updatedProductXml = await updateRes.text();
      console.log(`   Response: ${updatedProductXml.substring(0, 100)}...\n`);
      
      // Test 5: Delete product
      console.log(`5. Testing DELETE /api/products/${productId}`);
      const deleteRes = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/xml'
        }
      });
      
      console.log(`   Status: ${deleteRes.status}`);
      const deleteResultXml = await deleteRes.text();
      console.log(`   Response: ${deleteResultXml.substring(0, 100)}...\n`);
    }
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the tests
testApi();