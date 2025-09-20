const http = require('http');
const url = require('url');
const { createClient } = require('redis');
const config = require('./src/config');
const { sendError } = require('./src/utils/response');
const { TokenBucketRateLimiter, createRateLimitMiddleware } = require('./src/middleware/rateLimiter');
const apiRoutes = require('./src/routes/api');

// Redis client
let redisClient;
let rateLimiter;

// CORS middleware
function corsMiddleware(req, res) {
  res.setHeader('Access-Control-Allow-Origin', config.cors.origin);
  res.setHeader('Access-Control-Allow-Methods', config.cors.methods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', config.cors.headers.join(', '));
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return true;
  }
  return false;
}

// Initialize Redis connection
async function initializeRedis() {
  try {
    redisClient = createClient({
      url: config.redis.url,
      retryDelayOnFailover: config.redis.retryDelayOnFailover,
      maxRetriesPerRequest: config.redis.maxRetriesPerRequest
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    await redisClient.connect();
    rateLimiter = new TokenBucketRateLimiter(redisClient);
    
    console.log('Redis initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Redis:', error);
    console.log('Server will run without rate limiting');
    rateLimiter = null;
  }
}

// Main server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${path}`);

  // Apply CORS
  if (corsMiddleware(req, res)) {
    return;
  }

  try {
    // Apply rate limiting to API endpoints
    if (path.startsWith('/api/') && rateLimiter) {
      const rateLimitMiddleware = createRateLimitMiddleware(rateLimiter);
      await rateLimitMiddleware(req, res);
    }

    switch (path) {
      case '/api/data':
        if (method === 'GET') {
          await apiRoutes.handleApiData(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/api/status':
        if (method === 'GET') {
          await apiRoutes.handleApiStatus(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/api/test':
        if (method === 'GET') {
          await apiRoutes.handleApiTest(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
        
      case '/':
        // Frontend interface
        const frontend = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Rate Limited API</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
              .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              h1 { color: #333; text-align: center; }
              .endpoint { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 4px; border-left: 4px solid #007acc; }
              .endpoint h3 { margin-top: 0; color: #007acc; }
              .endpoint code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
              button { background: #007acc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 5px; }
              button:hover { background: #005999; }
              .result { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 4px; font-family: monospace; white-space: pre-wrap; }
              .rate-limit-info { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
              .rate-limit-info h3 { margin-top: 0; color: #856404; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Rate Limited API</h1>
              
              <div class="rate-limit-info">
                <h3>Rate Limit Information</h3>
                <p><strong>Token Bucket:</strong> ${config.rateLimit.tokenBucket.capacity} tokens capacity</p>
                <p><strong>Refill Rate:</strong> ${config.rateLimit.tokenBucket.refillRate} token per second</p>
                <p><strong>Window:</strong> ${config.rateLimit.windowMs / 1000} seconds</p>
                <p><strong>Max Requests:</strong> ${config.rateLimit.maxRequests} per window</p>
              </div>
              
              <div class="endpoint">
                <h3>GET /api/data</h3>
                <p>Returns sample API data</p>
                <button onclick="testEndpoint('/api/data')">Test Endpoint</button>
              </div>
              
              <div class="endpoint">
                <h3>GET /api/status</h3>
                <p>Returns API status and rate limit information</p>
                <button onclick="testEndpoint('/api/status')">Test Endpoint</button>
              </div>
              
              <div class="endpoint">
                <h3>GET /api/test</h3>
                <p>Test endpoint with random delay</p>
                <button onclick="testEndpoint('/api/test')">Test Endpoint</button>
              </div>
              
              <div id="result" class="result" style="display: none;"></div>
            </div>
            
            <script>
              async function testEndpoint(endpoint) {
                const resultDiv = document.getElementById('result');
                resultDiv.style.display = 'block';
                resultDiv.textContent = 'Loading...';
                
                try {
                  const response = await fetch(endpoint);
                  const data = await response.json();
                  
                  let resultText = \`Status: \${response.status} \${response.statusText}\\n\\n\`;
                  
                  // Add rate limit headers if present
                  const limit = response.headers.get('X-RateLimit-Limit');
                  const remaining = response.headers.get('X-RateLimit-Remaining');
                  const reset = response.headers.get('X-RateLimit-Reset');
                  const retryAfter = response.headers.get('Retry-After');
                  
                  if (limit) {
                    resultText += \`Rate Limit Info:\\n\`;
                    resultText += \`  Limit: \${limit}\\n\`;
                    resultText += \`  Remaining: \${remaining}\\n\`;
                    resultText += \`  Reset: \${reset}\\n\`;
                    if (retryAfter) {
                      resultText += \`  Retry After: \${retryAfter} seconds\\n\`;
                    }
                    resultText += \`\\n\`;
                  }
                  
                  resultText += \`Response:\\n\${JSON.stringify(data, null, 2)}\`;
                  resultDiv.textContent = resultText;
                } catch (error) {
                  resultDiv.textContent = \`Error: \${error.message}\`;
                }
              }
              
              // Test all endpoints on load
              setTimeout(() => {
                testEndpoint('/api/status');
              }, 1000);
            </script>
          </body>
          </html>
        `;
        sendResponse(res, 200, frontend, 'text/html');
        break;
        
      default:
        sendError(res, 404, 'Not found');
    }
  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// Start server
async function startServer() {
  await initializeRedis();
  
  server.listen(config.port, () => {
    console.log(`Rate Limited API server running on port ${config.port}`);
    console.log(`Available endpoints:`);
    console.log(`  GET / - Frontend interface`);
    console.log(`  GET /api/data - Sample API data`);
    console.log(`  GET /api/status - API status`);
    console.log(`  GET /api/test - Test endpoint`);
    console.log(`\nRate limiting:`);
    console.log(`  Token bucket capacity: ${config.rateLimit.tokenBucket.capacity}`);
    console.log(`  Refill rate: ${config.rateLimit.tokenBucket.refillRate} token/second`);
    console.log(`  Window: ${config.rateLimit.windowMs / 1000} seconds`);
    if (!rateLimiter) {
      console.log(`\n⚠️  Warning: Redis not available, rate limiting disabled`);
    }
  });
}

startServer().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  if (redisClient) {
    await redisClient.quit();
  }
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  if (redisClient) {
    await redisClient.quit();
  }
  server.close(() => {
    process.exit(0);
  });
});