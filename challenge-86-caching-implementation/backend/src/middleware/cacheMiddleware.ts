import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../application/services/CacheService';

export class CacheMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  cache = (ttl?: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = this.generateCacheKey(req);
      
      // Try to get cached response
      const cachedResponse = await this.cacheService.get(key);
      
      if (cachedResponse) {
        return res.json(cachedResponse);
      }
      
      // Override res.json to cache the response
      const originalJson = res.json;
      res.json = (body: any) => {
        // Cache the response
        this.cacheService.set(key, body, ttl);
        return originalJson.call(res, body);
      };
      
      next();
      return;
    };
  };

  private generateCacheKey(req: Request): string {
    return `cache:${req.method}:${req.originalUrl}:${JSON.stringify(req.query)}`;
  }
}