const createSuccessResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

const createErrorResponse = (error, message = 'An error occurred') => {
  return {
    success: false,
    message,
    error: error.message || error,
  };
};

const createPaginationMetadata = (paginationData) => {
  if (paginationData.cursors) {
    // Cursor-based pagination
    return {
      total: paginationData.total,
      hasNextPage: paginationData.cursors.hasNextPage,
      hasPreviousPage: paginationData.cursors.hasPreviousPage,
      startCursor: paginationData.cursors.startCursor,
      endCursor: paginationData.cursors.endCursor,
    };
  } else {
    // Offset-based pagination
    return {
      total: paginationData.total,
      page: paginationData.page,
      limit: paginationData.limit,
      totalPages: paginationData.totalPages,
    };
  }
};

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  createPaginationMetadata,
};