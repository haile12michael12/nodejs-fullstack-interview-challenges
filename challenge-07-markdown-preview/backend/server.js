const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3002;

// Custom Markdown parser
class MarkdownParser {
  constructor() {
    this.rules = [
      { pattern: /^### (.*$)/gm, replacement: '<h3>$1</h3>' },
      { pattern: /^## (.*$)/gm, replacement: '<h2>$1</h2>' },
      { pattern: /^# (.*$)/gm, replacement: '<h1>$1</h1>' },
      { pattern: /^\* (.*$)/gm, replacement: '<li>$1</li>' },
      { pattern: /^- (.*$)/gm, replacement: '<li>$1</li>' },
      { pattern: /^\d+\. (.*$)/gm, replacement: '<li>$1</li>' }
    ];
  }

  parse(markdown) {
    let html = markdown;

    // Parse headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Parse unordered lists
    html = this.parseUnorderedLists(html);

    // Parse ordered lists
    html = this.parseOrderedLists(html);

    // Parse paragraphs
    html = this.parseParagraphs(html);

    // Escape HTML characters
    html = this.escapeHtml(html);

    // Re-apply headers (after escaping)
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Re-apply lists (after escaping)
    html = this.parseUnorderedLists(html);
    html = this.parseOrderedLists(html);

    return html;
  }

  parseUnorderedLists(markdown) {
    // Handle bullet points
    let html = markdown;
    
    // Find all unordered list blocks
    const listPattern = /^(\*|\-|\+) (.+)(\n^(\*|\-|\+) .+)*/gm;
    html = html.replace(listPattern, (match) => {
      const items = match.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const trimmed = line.trim();
          if (trimmed.match(/^(\*|\-|\+) /)) {
            return `<li>${trimmed.substring(2)}</li>`;
          }
          return '';
        })
        .filter(item => item);
      
      return `<ul>${items.join('')}</ul>`;
    });

    return html;
  }

  parseOrderedLists(markdown) {
    // Handle numbered lists
    let html = markdown;
    
    // Find all ordered list blocks
    const listPattern = /^\d+\. (.+)(\n^\d+\. .+)*/gm;
    html = html.replace(listPattern, (match) => {
      const items = match.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const trimmed = line.trim();
          if (trimmed.match(/^\d+\. /)) {
            return `<li>${trimmed.replace(/^\d+\. /, '')}</li>`;
          }
          return '';
        })
        .filter(item => item);
      
      return `<ol>${items.join('')}</ol>`;
    });

    return html;
  }

  parseParagraphs(markdown) {
    // Convert double newlines to paragraph breaks
    let html = markdown;
    
    // Split by double newlines and wrap in paragraphs
    const paragraphs = html.split(/\n\s*\n/);
    
    html = paragraphs.map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      
      // Don't wrap headers or lists in paragraphs
      if (trimmed.match(/^<h[1-6]>/) || 
          trimmed.match(/^<(ul|ol)>/) ||
          trimmed.match(/^#+ /)) {
        return trimmed;
      }
      
      return `<p>${trimmed}</p>`;
    }).join('\n\n');

    return html;
  }

  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  sanitize(html) {
    // Remove potentially dangerous tags and attributes
    const allowedTags = ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'br'];
    
    // Simple tag filtering (in production, use a proper HTML sanitizer)
    return html.replace(/<([^>]+)>/g, (match, tagContent) => {
      const tagName = tagContent.split(' ')[0].toLowerCase();
      if (allowedTags.includes(tagName)) {
        return `<${tagContent}>`;
      }
      return '';
    });
  }
}

// Utility functions
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendResponse(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(typeof data === 'string' ? data : JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendResponse(res, statusCode, { error: message });
}

// Route handlers
async function handleRender(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method not allowed');
  }

  try {
    const body = await parseBody(req);
    const { markdown } = body;

    if (!markdown || typeof markdown !== 'string') {
      return sendError(res, 400, 'Markdown content is required');
    }

    if (markdown.length > 10000) {
      return sendError(res, 400, 'Markdown content too large (max 10,000 characters)');
    }

    const parser = new MarkdownParser();
    const html = parser.parse(markdown);
    const sanitizedHtml = parser.sanitize(html);

    sendResponse(res, 200, {
      html: sanitizedHtml,
      originalLength: markdown.length,
      renderedLength: sanitizedHtml.length
    });

  } catch (error) {
    console.error('Render error:', error);
    sendError(res, 500, 'Failed to render markdown');
  }
}

async function handlePreview(req, res) {
  if (req.method !== 'GET') {
    return sendError(res, 405, 'Method not allowed');
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Markdown Preview</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
          color: #333;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          height: 80vh;
        }
        .editor, .preview {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
        }
        .editor {
          background: #f8f9fa;
        }
        .preview {
          background: white;
          overflow-y: auto;
        }
        textarea {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 14px;
          resize: none;
        }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; border-bottom: 1px solid #bdc3c7; padding-bottom: 5px; }
        h3 { color: #7f8c8d; }
        ul, ol { padding-left: 20px; }
        li { margin-bottom: 5px; }
        p { margin-bottom: 15px; }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #ecf0f1;
        }
        .examples {
          margin-top: 20px;
          padding: 15px;
          background: #ecf0f1;
          border-radius: 5px;
        }
        .examples h4 {
          margin-top: 0;
          color: #2c3e50;
        }
        .examples code {
          background: #34495e;
          color: #ecf0f1;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Markdown Preview</h1>
        <p>Custom markdown parser supporting headers and lists</p>
      </div>
      
      <div class="container">
        <div class="editor">
          <h3>Markdown Editor</h3>
          <textarea id="markdown" placeholder="Enter your markdown here..."># Welcome to Markdown Preview

## Features

This custom parser supports:

### Headers
- H1, H2, and H3 headers
- Use # for H1, ## for H2, ### for H3

### Lists

#### Unordered Lists
- Use * for bullet points
- Or use - for bullet points
- Each item on a new line

#### Ordered Lists
1. Use numbers followed by a period
2. Each item on a new line
3. Automatic numbering

## Example Content

Here's a sample paragraph with some text.

### Another Section

More content here with another paragraph.

- List item one
- List item two
- List item three

1. First numbered item
2. Second numbered item
3. Third numbered item</textarea>
        </div>
        
        <div class="preview">
          <h3>Preview</h3>
          <div id="preview"></div>
        </div>
      </div>
      
      <div class="examples">
        <h4>Supported Syntax:</h4>
        <p>
          <strong>Headers:</strong> <code># H1</code> <code>## H2</code> <code>### H3</code><br>
          <strong>Lists:</strong> <code>* item</code> <code>- item</code> <code>1. item</code><br>
          <strong>Paragraphs:</strong> Separate with blank lines
        </p>
      </div>

      <script>
        const markdownTextarea = document.getElementById('markdown');
        const previewDiv = document.getElementById('preview');
        
        function updatePreview() {
          const markdown = markdownTextarea.value;
          
          fetch('/api/render', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ markdown })
          })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              previewDiv.innerHTML = '<p style="color: red;">Error: ' + data.error + '</p>';
            } else {
              previewDiv.innerHTML = data.html;
            }
          })
          .catch(error => {
            previewDiv.innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
          });
        }
        
        // Update preview on input
        markdownTextarea.addEventListener('input', updatePreview);
        
        // Initial preview
        updatePreview();
      </script>
    </body>
    </html>
  `;

  sendResponse(res, 200, html, 'text/html');
}

// Main server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  try {
    switch (path) {
      case '/render':
        handleRender(req, res);
        break;
      case '/':
        handlePreview(req, res);
        break;
      default:
        sendError(res, 404, 'Not found');
    }
  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`Markdown Preview server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET / - Preview interface`);
  console.log(`  POST /render - Render markdown to HTML`);
  console.log(`\nSupported markdown features:`);
  console.log(`  - Headers (# ## ###)`);
  console.log(`  - Unordered lists (* -)`);
  console.log(`  - Ordered lists (1. 2. 3.)`);
  console.log(`  - Paragraphs`);
});
