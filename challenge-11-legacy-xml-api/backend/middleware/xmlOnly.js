function xmlOnly(req, res, next) {
  const contentType = req.headers['content-type'];
  
  // For POST, PUT requests, enforce XML content type
  if ((req.method === 'POST' || req.method === 'PUT') && 
      (!contentType || !contentType.includes('application/xml'))) {
    res.writeHead(400, {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-cache'
    });
    
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>400</code>
  <message>Content-Type must be application/xml</message>
</error>`;
    
    return res.end(errorXml);
  }
  
  // Set response content type to XML
  res.setHeader('Content-Type', 'application/xml');
  
  next();
}

module.exports = xmlOnly;