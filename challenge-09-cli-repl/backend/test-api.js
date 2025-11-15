const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function testAPI() {
  try {
    // Test creating an item
    const createOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/items',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify({ key: 'test', value: 'This is a test item' }).length
      }
    };
    
    const createResponse = await makeRequest(createOptions, JSON.stringify({ key: 'test', value: 'This is a test item' }));
    console.log('Create response:', createResponse.statusCode);
    
    // Test getting all items
    const getOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/items',
      method: 'GET'
    };
    
    const getResponse = await makeRequest(getOptions);
    console.log('Items:', getResponse.data);
    
    // Test getting stats
    const statsOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/stats',
      method: 'GET'
    };
    
    const statsResponse = await makeRequest(statsOptions);
    console.log('Stats:', statsResponse.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();