// Upload routes
const FileController = require('../core/FileController');

function setupRoutes(server) {
  server.route('/upload', FileController.handleUpload);
  server.route('/files', 'GET', FileController.handleListFiles);
  server.route('/delete', 'DELETE', FileController.handleDeleteFile);
}

module.exports = { setupRoutes };