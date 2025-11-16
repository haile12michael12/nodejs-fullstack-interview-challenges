const { createErrorXml, createSuccessXml } = require('../xml/xmlBuilder');

// Helper function to send XML response
function sendXmlResponse(res, statusCode, xmlData) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'no-cache'
  });
  res.end(xmlData);
}

// Helper function to send error response
function sendError(res, statusCode, message) {
  const errorXml = createErrorXml(statusCode, message);
  sendXmlResponse(res, statusCode, errorXml);
}

// Helper function to send success response
function sendSuccess(res, message) {
  const successXml = createSuccessXml(message);
  sendXmlResponse(res, 200, successXml);
}

module.exports = {
  sendXmlResponse,
  sendError,
  sendSuccess
};