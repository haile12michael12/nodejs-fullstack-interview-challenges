import { Router } from 'express';
import { cacheRoutes } from './cache.routes';

export const registerRoutes = (
  router: Router,
  cacheController: any
): void => {
  router.use('/cache', cacheRoutes(cacheController));
  
  // Health check endpoint
  router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });
  
  // Catch-all route
  router.all('*', (req, res) => {
    res.status(404).json({ 
      success: false, 
      message: 'Route not found' 
    });
  });
};