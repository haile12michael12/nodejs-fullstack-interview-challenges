// Simple logger that logs raw XML request bodies
function logXmlRequest(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Log raw XML body for POST/PUT requests
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log(`[${new Date().toISOString()}] Raw XML Body: ${body}`);
    });
  }
  
  next();
}

module.exports = {
  logXmlRequest
};