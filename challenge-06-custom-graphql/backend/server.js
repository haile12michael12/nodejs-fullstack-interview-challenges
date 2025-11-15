const http = require('http');
const url = require('url');
const config = require('./src/config');
const { sendError, sendResponse } = require('./src/utils/response');
const { handleGraphQL } = require('./src/routes/graphql');

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
    switch (path) {
      case '/graphql':
        if (method === 'POST') {
          await handleGraphQL(req, res);
        } else {
          sendError(res, 405, 'Method not allowed. Use POST for GraphQL queries.');
        }
        break;
        
      case '/':
        // GraphQL Playground
        const playground = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>GraphQL Playground</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
              .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              h1 { color: #333; text-align: center; }
              .playground { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
              .editor, .result { border: 1px solid #ddd; border-radius: 4px; }
              .editor { background: #f8f9fa; }
              .result { background: white; }
              textarea { width: 100%; height: 400px; border: none; outline: none; padding: 15px; font-family: 'Monaco', 'Menlo', monospace; font-size: 14px; resize: none; background: transparent; }
              .result-content { padding: 15px; font-family: 'Monaco', 'Menlo', monospace; font-size: 14px; white-space: pre-wrap; }
              button { background: #007acc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; }
              button:hover { background: #005999; }
              .examples { margin: 20px 0; padding: 15px; background: #e8f4fd; border-radius: 4px; }
              .examples h3 { margin-top: 0; color: #2c3e50; }
              .examples code { background: #34495e; color: #ecf0f1; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>GraphQL Playground</h1>
              
              <div class="playground">
                <div class="editor">
                  <h3>Query Editor</h3>
                  <textarea id="query" placeholder="Enter your GraphQL query here...">query {
  users {
    id
    name
    email
    posts {
      id
      title
      content
    }
  }
}</textarea>
                  <button onclick="executeQuery()">Execute Query</button>
                </div>
                
                <div class="result">
                  <h3>Result</h3>
                  <div id="result" class="result-content">Click "Execute Query" to see results...</div>
                </div>
              </div>
              
              <div class="examples">
                <h3>Example Queries:</h3>
                <p><strong>Get all users:</strong></p>
                <code>query { users { id name email } }</code>
                
                <p><strong>Get user with posts:</strong></p>
                <code>query { user(id: 1) { id name posts { id title } } }</code>
                
                <p><strong>Create a user:</strong></p>
                <code>mutation { createUser(name: "New User", email: "new@example.com") { id name email } }</code>
                
                <p><strong>Create a post:</strong></p>
                <code>mutation { createPost(title: "New Post", content: "Post content", authorId: 1) { id title author { name } } }</code>
              </div>
            </div>
            
            <script>
              async function executeQuery() {
                const query = document.getElementById('query').value;
                const resultDiv = document.getElementById('result');
                
                if (!query.trim()) {
                  resultDiv.textContent = 'Please enter a query';
                  return;
                }
                
                resultDiv.textContent = 'Executing...';
                
                try {
                  const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query })
                  });
                  
                  const result = await response.json();
                  resultDiv.textContent = JSON.stringify(result, null, 2);
                } catch (error) {
                  resultDiv.textContent = 'Error: ' + error.message;
                }
              }
            </script>
          </body>
          </html>
        `;
        sendResponse(res, 200, playground, 'text/html');
        break;
        
      default:
        sendError(res, 404, 'Not found');
    }
  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(config.port, () => {
  console.log(`GraphQL server running on port ${config.port}`);
  console.log(`Available endpoints:`);
  console.log(`  GET / - GraphQL Playground`);
  console.log(`  POST /graphql - GraphQL endpoint`);
  console.log(`\nExample queries:`);
  console.log(`  query { users { id name email } }`);
  console.log(`  mutation { createUser(name: "Test", email: "test@example.com") { id } }`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});