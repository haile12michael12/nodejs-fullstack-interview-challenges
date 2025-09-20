const url = require('url');
const corsMiddleware = require('./middleware/cors');
const authMiddleware = require('./middleware/auth');
const { sendError } = require('./utils/response');

// Import route handlers
const authRoutes = require('./routes/auth');

class Router {
  constructor() {
    this.routes = new Map();
    this.middleware = [];
  }

  use(middleware) {
    this.middleware.push(middleware);
  }

  get(path, ...handlers) {
    this.addRoute('GET', path, handlers);
  }

  post(path, ...handlers) {
    this.addRoute('POST', path, handlers);
  }

  put(path, ...handlers) {
    this.addRoute('PUT', path, handlers);
  }

  delete(path, ...handlers) {
    this.addRoute('DELETE', path, handlers);
  }

  addRoute(method, path, handlers) {
    const key = `${method}:${path}`;
    this.routes.set(key, handlers);
  }

  async handleRequest(req, res) {
    // Apply global middleware
    for (const middleware of this.middleware) {
      middleware(req, res);
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // Add parsed URL to request object
    req.url = parsedUrl;
    req.query = parsedUrl.query;

    const key = `${method}:${path}`;
    const handlers = this.routes.get(key);

    if (!handlers) {
      return sendError(res, 404, 'Route not found');
    }

    // Execute handlers in sequence
    let index = 0;
    const next = (error) => {
      if (error) {
        return sendError(res, 500, 'Internal server error', error.message);
      }

      if (index < handlers.length) {
        const handler = handlers[index++];
        try {
          const result = handler(req, res, next);
          if (result && typeof result.then === 'function') {
            result.catch(next);
          }
        } catch (error) {
          next(error);
        }
      }
    };

    next();
  }

  setupRoutes() {
    // CORS middleware
    this.use(corsMiddleware);

    // Auth routes
    this.post('/login', authRoutes.handleLogin);
    this.post('/refresh', authRoutes.handleRefresh);
    this.get('/me', authMiddleware, authRoutes.handleMe);
    this.get('/protected', authMiddleware, authRoutes.handleProtected);
  }
}

module.exports = Router;

