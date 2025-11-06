const importService = require('../services/import.service');
const { logger } = require('../config/logger');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await importService.processFile(req.file, req.body);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getImportStatus = async (req, res) => {
  try {
    const { importId } = req.params;
    const status = await importService.getImportStatus(importId);
    res.status(200).json(status);
  } catch (error) {
    logger.error('Get status error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getImportErrors = async (req, res) => {
  try {
    const { importId } = req.params;
    const errors = await importService.getImportErrors(importId);
    res.status(200).json(errors);
  } catch (error) {
    logger.error('Get errors error:', error);
    res.status(500).json({ error: error.message });
  }
};

const downloadTemplate = async (req, res) => {
  try {
    const { type } = req.params;
    const template = await importService.getTemplate(type);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=template.${type}`);
    res.status(200).send(template);
  } catch (error) {
    logger.error('Download template error:', error);
    res.status(500).json({ error: error.message });
  }
};

const listImports = async (req, res) => {
  try {
    const imports = await importService.listImports();
    res.status(200).json(imports);
  } catch (error) {
    logger.error('List imports error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
  getImportStatus,
  getImportErrors,
  downloadTemplate,
  listImports
};