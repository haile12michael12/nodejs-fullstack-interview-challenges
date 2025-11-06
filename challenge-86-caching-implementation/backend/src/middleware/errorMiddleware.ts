import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../core/errors/ErrorHandler';
import logger from '../core/utils/logger';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = errorHandler(err);
  
  logger.error(`Error ${error.statusCode}: ${error.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
  });
  
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};