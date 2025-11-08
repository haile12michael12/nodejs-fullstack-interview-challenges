// Middleware to measure response time for requests
const responseTimerMiddleware = (req, res, next) => {
  // Record the start time
  const start = Date.now();
  
  // Override the res.end method to calculate and log response time
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    // Calculate response time
    const duration = Date.now() - start;
    res.responseTime = duration;
    
    // Add response time to response headers
    res.setHeader('X-Response-Time', `${duration}ms`);
    
    // Call the original end method
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

module.exports = responseTimerMiddleware;