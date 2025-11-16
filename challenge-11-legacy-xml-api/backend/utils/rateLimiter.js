// Simple in-memory rate limiter
const rateLimits = new Map();

function rateLimiter(maxRequests = 10, windowMs = 60000) {
  return (req, res, next) => {
    const clientId = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();
    const clientData = rateLimits.get(clientId) || { count: 0, resetTime: now + windowMs };
    
    // Reset count if window has expired
    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = now + windowMs;
    }
    
    // Increment request count
    clientData.count++;
    rateLimits.set(clientId, clientData);
    
    // Check if limit exceeded
    if (clientData.count > maxRequests) {
      res.writeHead(429, {
        'Content-Type': 'application/xml',
        'Retry-After': Math.ceil((clientData.resetTime - now) / 1000)
      });
      
      const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>429</code>
  <message>Too Many Requests</message>
</error>`;
      
      return res.end(errorXml);
    }
    
    next();
  };
}

module.exports = rateLimiter;