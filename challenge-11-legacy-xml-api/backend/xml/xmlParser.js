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

module.exports = {
  parseXmlBody
};