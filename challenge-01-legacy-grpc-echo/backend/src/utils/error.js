class CustomError extends Error {
  constructor(message, statusCode = 500, errorCode = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
  }
}

function handleError(error, callback) {
  if (error instanceof CustomError) {
    callback({
      code: error.statusCode,
      message: error.message,
      errorCode: error.errorCode,
      timestamp: error.timestamp
    });
  } else {
    // Handle unexpected errors
    callback({
      code: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = {
  CustomError,
  handleError
};