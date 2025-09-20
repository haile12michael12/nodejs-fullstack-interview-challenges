function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk;
      
      // Prevent request body from getting too large
      if (body.length > 1e6) {
        reject(new Error('Request body too large'));
        return;
      }
    });
    
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    
    req.on('error', reject);
  });
}

function parseQuery(url) {
  const urlObj = new URL(url, `http://localhost:${process.env.PORT || 3000}`);
  return Object.fromEntries(urlObj.searchParams);
}

module.exports = {
  parseBody,
  parseQuery
};

