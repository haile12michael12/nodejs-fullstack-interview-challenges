import express, { Router } from 'express';
import { config } from './config';
import { loggingMiddleware } from './middleware/loggingMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';
import { registerRoutes } from './presentation/routes';
import { CacheFactory } from './infrastructure/cache/CacheFactory';
import { CacheService } from './application/services/CacheService';
import { CacheController } from './presentation/controllers/CacheController';
import { GetCacheStatsUseCase } from './application/usecases/GetCacheStatsUseCase';
import { InvalidateCacheUseCase } from './application/usecases/InvalidateCacheUseCase';
import { WarmCacheUseCase } from './application/usecases/WarmCacheUseCase';

const app = express();

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Initialize cache
const initializeCache = async () => {
  const cacheFactory = CacheFactory.getInstance();
  const cacheProvider = await cacheFactory.createCacheProvider(
    process.env.REDIS_URL ? 'redis' : 'memory'
  );
  const cacheService = new CacheService(cacheProvider);
  
  // Initialize use cases
  const getCacheStatsUseCase = new GetCacheStatsUseCase(cacheService);
  const invalidateCacheUseCase = new InvalidateCacheUseCase(cacheService);
  const warmCacheUseCase = new WarmCacheUseCase(cacheService);
  
  // Initialize controller
  const cacheController = new CacheController(
    getCacheStatsUseCase,
    invalidateCacheUseCase,
    warmCacheUseCase
  );
  
  // Register routes
  const router = Router();
  registerRoutes(router, cacheController);
  app.use('/api', router);
};

initializeCache().catch((error) => {
  console.error('Failed to initialize cache:', error);
  process.exit(1);
});

// Error handling middleware
app.use(errorMiddleware);

export default app;