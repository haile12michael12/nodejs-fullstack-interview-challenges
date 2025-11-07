const createSuccessResponse = (data, message = 'Success', meta = null) => {
  const response = {
    success: true,
    message,
    data,
  };
  
  if (meta) {
    response.meta = meta;
  }
  
  return response;
};

const createErrorResponse = (error, message = 'An error occurred', statusCode = 500) => {
  return {
    success: false,
    message,
    error: error.message || error,
    statusCode,
  };
};

const createPaginatedResponse = (data, pagination, message = 'Success') => {
  return {
    success: true,
    message,
    data: data.items,
    meta: {
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: pagination.totalPages,
      },
    },
  };
};

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
};