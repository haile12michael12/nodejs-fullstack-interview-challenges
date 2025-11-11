// Unified JSON response helper
function sendResponse(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(typeof data === 'string' ? data : JSON.stringify(data));
}

function sendError(res, statusCode, message, details = null) {
  const errorResponse = { error: message };
  if (details) {
    errorResponse.details = details;
  }
  sendResponse(res, statusCode, errorResponse);
}

function sendSuccess(res, data, statusCode = 200) {
  sendResponse(res, statusCode, { success: true, data });
}

module.exports = {
  sendResponse,
  sendError,
  sendSuccess
};