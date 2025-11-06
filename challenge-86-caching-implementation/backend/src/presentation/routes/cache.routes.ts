import { Router } from 'express';
import { CacheController } from '../controllers/CacheController';

export const cacheRoutes = (
  cacheController: CacheController
): Router => {
  const router = Router();

  /**
   * @route GET /cache/stats
   * @desc Get cache statistics
   */
  router.get('/stats', cacheController.getStats);

  /**
   * @route POST /cache/invalidate
   * @desc Invalidate cache entries
   */
  router.post('/invalidate', cacheController.invalidate);

  /**
   * @route POST /cache/warm
   * @desc Preload cache with data
   */
  router.post('/warm', cacheController.warm);

  return router;
};