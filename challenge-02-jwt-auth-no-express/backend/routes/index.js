// Route registration
const authMiddleware = require('../middleware/auth');
const { handleLoginRoute, handleRefreshRoute, handleLogoutRoute } = require('./auth');
const { handleMeRoute, handleUsersRoute } = require('./user');

function setupRoutes(router) {
  // Auth routes
  router.post('/login', handleLoginRoute);
  router.post('/refresh', handleRefreshRoute);
  router.post('/logout', handleLogoutRoute);
  
  // Protected routes
  router.get('/me', authMiddleware, handleMeRoute);
  router.get('/users', authMiddleware, handleUsersRoute);
}

module.exports = {
  setupRoutes
};