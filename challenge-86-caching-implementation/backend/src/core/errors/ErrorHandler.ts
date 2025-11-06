import { AppError } from './AppError';

export const errorHandler = (err: Error) => {
  if (err instanceof AppError) {
    return {
      message: err.message,
      statusCode: err.statusCode,
      isOperational: err.isOperational,
    };
  }

  // For unexpected errors
  return {
    message: 'Internal Server Error',
    statusCode: 500,
    isOperational: false,
  };
};