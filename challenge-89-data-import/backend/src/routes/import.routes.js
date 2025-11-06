const express = require('express');
const router = express.Router();
const importController = require('../controllers/import.controller');
const upload = require('../middleware/upload');

// Import routes
router.post('/upload', upload.single('file'), importController.uploadFile);
router.get('/status/:importId', importController.getImportStatus);
router.get('/errors/:importId', importController.getImportErrors);
router.get('/template/:type', importController.downloadTemplate);
router.get('/imports', importController.listImports);

module.exports = router;