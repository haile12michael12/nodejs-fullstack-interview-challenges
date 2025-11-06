import { Request, Response, NextFunction } from 'express';
import logger from '../core/utils/logger';

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  
  // Log request
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    body: req.body,
  });
  
  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Response: ${res.statusCode} ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });
  
  next();
};