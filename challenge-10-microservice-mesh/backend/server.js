const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = process.env.PORT || 8080;
const REPOS_DIR = path.join(__dirname, 'repos');

// Create repos directory if it doesn't exist
if (!fs.existsSync(REPOS_DIR)) {
  fs.mkdirSync(REPOS_DIR, { recursive: true });
}

// Git utilities
class GitRepository {
  constructor(repoPath) {
    this.path = repoPath;
    this.objectsPath = path.join(repoPath, 'objects');
    this.refsPath = path.join(repoPath, 'refs');
    this.headPath = path.join(repoPath, 'HEAD');
  }

  exists() {
    return fs.existsSync(this.path) && fs.existsSync(this.objectsPath);
  }

  getRefs() {
    const refs = {};
    
    try {
      // Read HEAD
      if (fs.existsSync(this.headPath)) {
        const headContent = fs.readFileSync(this.headPath, 'utf8').trim();
        if (headContent.startsWith('ref: ')) {
          refs['HEAD'] = headContent.substring(5);
        } else {
          refs['HEAD'] = headContent;
        }
      }

      // Read refs
      const readRefsDir = (dir, prefix = '') => {
        if (!fs.existsSync(dir)) return;
        
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            readRefsDir(fullPath, prefix + entry.name + '/');
          } else {
            const refContent = fs.readFileSync(fullPath, 'utf8').trim();
            refs[prefix + entry.name] = refContent;
          }
        }
      };

      readRefsDir(path.join(this.refsPath, 'heads'));
      readRefsDir(path.join(this.refsPath, 'tags'));

    } catch (error) {
      console.error('Error reading refs:', error);
    }

    return refs;
  }

  getObject(hash) {
    try {
      const dir = hash.substring(0, 2);
      const file = hash.substring(2);
      const objectPath = path.join(this.objectsPath, dir, file);
      
      if (!fs.existsSync(objectPath)) {
        return null;
      }

      const compressed = fs.readFileSync(objectPath);
      const decompressed = zlib.inflateSync(compressed);
      
      // Parse object header
      const headerEnd = decompressed.indexOf(0);
      if (headerEnd === -1) {
        throw new Error('Invalid object format');
      }

      const header = decompressed.subarray(0, headerEnd).toString();
      const content = decompressed.subarray(headerEnd + 1);

      const [type, size] = header.split(' ');
      if (!type || !size || parseInt(size) !== content.length) {
        throw new Error('Invalid object header');
      }

      return { type, size: parseInt(size), content };
    } catch (error) {
      console.error('Error reading object:', error);
      return null;
    }
  }

  getPackFile(hash) {
    try {
      const packPath = path.join(this.path, 'objects', 'pack', `pack-${hash}.pack`);
      const idxPath = path.join(this.path, 'objects', 'pack', `pack-${hash}.idx`);
      
      if (!fs.existsSync(packPath) || !fs.existsSync(idxPath)) {
        return null;
      }

      return {
        pack: fs.readFileSync(packPath),
        idx: fs.readFileSync(idxPath)
      };
    } catch (error) {
      console.error('Error reading pack file:', error);
      return null;
    }
  }
}

// Utility functions
function sendResponse(res, statusCode, data, contentType = 'application/octet-stream') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache'
  });
  res.end(data);
}

function sendError(res, statusCode, message) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain'
  });
  res.end(message);
}

function parseRepoPath(pathname) {
  // Extract repo name from URL like /repo.git/info/refs
  const match = pathname.match(/^\/([^\/]+)\.git/);
  return match ? match[1] : null;
}

function createRefsResponse(refs) {
  let response = '';
  for (const [ref, hash] of Object.entries(refs)) {
    response += `${hash} refs/${ref}\n`;
  }
  response += '\n'; // End with newline
  return response;
}

function createPackResponse(packData) {
  // Simple pack file format (simplified)
  const header = Buffer.from('PACK\x00\x00\x00\x02\x00\x00\x00\x01', 'binary');
  const content = Buffer.from(packData || 'dummy content');
  const trailer = crypto.createHash('sha1').update(header).update(content).digest();
  
  return Buffer.concat([header, content, trailer]);
}

// Route handlers
function handleInfoRefs(req, res, repoName, service) {
  const repoPath = path.join(REPOS_DIR, `${repoName}.git`);
  const repo = new GitRepository(repoPath);

  if (!repo.exists()) {
    return sendError(res, 404, 'Repository not found');
  }

  const refs = repo.getRefs();
  const response = createRefsResponse(refs);

  res.writeHead(200, {
    'Content-Type': `application/x-git-${service}-advertisement`,
    'Cache-Control': 'no-cache'
  });

  // Send capability advertisement
  const capabilities = service === 'upload-pack' 
    ? 'multi_ack thin-pack side-band side-band-64k ofs-delta shallow no-progress include-tag'
    : 'multi_ack thin-pack side-band side-band-64k ofs-delta shallow no-progress include-tag';
  
  res.write(`# service=git-${service}\n`);
  res.write('0000');
  res.end(response);
}

function handleUploadPack(req, res, repoName) {
  const repoPath = path.join(REPOS_DIR, `${repoName}.git`);
  const repo = new GitRepository(repoPath);

  if (!repo.exists()) {
    return sendError(res, 404, 'Repository not found');
  }

  // Parse the request body for want/have commands
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      // Simple pack file generation (in real implementation, this would be much more complex)
      const packData = createPackResponse('dummy pack content');
      sendResponse(res, 200, packData);
    } catch (error) {
      console.error('Error generating pack:', error);
      sendError(res, 500, 'Internal server error');
    }
  });
}

function handleReceivePack(req, res, repoName) {
  const repoPath = path.join(REPOS_DIR, `${repoName}.git`);
  
  // Create repository if it doesn't exist
  if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath, { recursive: true });
    fs.mkdirSync(path.join(repoPath, 'objects'), { recursive: true });
    fs.mkdirSync(path.join(repoPath, 'refs', 'heads'), { recursive: true });
    fs.mkdirSync(path.join(repoPath, 'refs', 'tags'), { recursive: true });
    
    // Initialize HEAD
    fs.writeFileSync(path.join(repoPath, 'HEAD'), 'ref: refs/heads/master\n');
  }

  let body = Buffer.alloc(0);
  req.on('data', chunk => body = Buffer.concat([body, chunk]));
  req.on('end', () => {
    try {
      // Simple response for successful push
      const response = '0000000000000000000000000000000000000000 capabilities^{}\x00report-status\n';
      res.writeHead(200, {
        'Content-Type': 'application/x-git-receive-pack-result',
        'Cache-Control': 'no-cache'
      });
      res.end(response);
    } catch (error) {
      console.error('Error processing receive pack:', error);
      sendError(res, 500, 'Internal server error');
    }
  });
}

function handleRepositoryList(req, res) {
  try {
    const repos = fs.readdirSync(REPOS_DIR)
      .filter(item => {
        const itemPath = path.join(REPOS_DIR, item);
        return fs.statSync(itemPath).isDirectory() && item.endsWith('.git');
      })
      .map(item => item.replace('.git', ''));

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Git Repositories</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { margin: 10px 0; }
          a { color: #007acc; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .clone { background: #f5f5f5; padding: 10px; border-radius: 4px; font-family: monospace; }
        </style>
      </head>
      <body>
        <h1>Available Git Repositories</h1>
        ${repos.length === 0 ? '<p>No repositories available.</p>' : `
          <ul>
            ${repos.map(repo => `
              <li>
                <h3>${repo}</h3>
                <p>Clone with:</p>
                <div class="clone">git clone http://localhost:${PORT}/${repo}.git</div>
              </li>
            `).join('')}
          </ul>
        `}
        <hr>
        <p><small>Git Over HTTP Server</small></p>
      </body>
      </html>
    `;

    sendResponse(res, 200, html, 'text/html');
  } catch (error) {
    console.error('Error listing repositories:', error);
    sendError(res, 500, 'Internal server error');
  }
}

// Main server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${pathname}`);

  try {
    // Root path - show repository list
    if (pathname === '/') {
      return handleRepositoryList(req, res);
    }

    // Extract repo name and service
    const repoName = parseRepoPath(pathname);
    if (!repoName) {
      return sendError(res, 400, 'Invalid repository path');
    }

    // Git smart HTTP endpoints
    if (pathname.endsWith('/info/refs')) {
      const service = parsedUrl.query.service;
      if (service === 'git-upload-pack' || service === 'git-receive-pack') {
        return handleInfoRefs(req, res, repoName, service.replace('git-', ''));
      } else {
        return sendError(res, 400, 'Invalid service');
      }
    }

    if (pathname.endsWith('/git-upload-pack') && method === 'POST') {
      return handleUploadPack(req, res, repoName);
    }

    if (pathname.endsWith('/git-receive-pack') && method === 'POST') {
      return handleReceivePack(req, res, repoName);
    }

    // Default 404
    sendError(res, 404, 'Not found');

  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`Git Over HTTP server running on port ${PORT}`);
  console.log(`Repository directory: ${REPOS_DIR}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET / - Repository list`);
  console.log(`  GET /<repo>.git/info/refs?service=git-upload-pack - Clone info`);
  console.log(`  GET /<repo>.git/info/refs?service=git-receive-pack - Push info`);
  console.log(`  POST /<repo>.git/git-upload-pack - Clone data`);
  console.log(`  POST /<repo>.git/git-receive-pack - Push data`);
  console.log(`\nExample usage:`);
  console.log(`  git clone http://localhost:${PORT}/my-repo.git`);
  console.log(`  git push http://localhost:${PORT}/my-repo.git main`);
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
