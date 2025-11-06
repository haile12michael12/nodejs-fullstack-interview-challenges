const fs = require('fs').promises;
const path = require('path');
const csvProcessor = require('./csv.processor');
const jsonProcessor = require('./json.processor');
const excelProcessor = require('./excel.processor');
const { Import } = require('../models/import.model');
const { ImportError } = require('../models/importError.model');
const { detectFileType, saveTempFile } = require('../utils/fileUtils');
const { validateData } = require('../utils/validation');
const { logger } = require('../config/logger');

const processFile = async (file, options) => {
  try {
    // Create import record
    const importRecord = new Import({
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype,
      status: 'processing',
      totalRows: 0,
      processedRows: 0,
      errorRows: 0
    });
    
    await importRecord.save();
    logger.info(`Created import record ${importRecord._id}`);
    
    // Process file based on type
    let result;
    const fileType = detectFileType(file.originalname);
    
    switch (fileType) {
      case 'csv':
        result = await csvProcessor.process(file.path, importRecord._id);
        break;
      case 'json':
        result = await jsonProcessor.process(file.path, importRecord._id);
        break;
      case 'xlsx':
        result = await excelProcessor.process(file.path, importRecord._id);
        break;
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
    
    // Update import record with results
    importRecord.status = 'completed';
    importRecord.totalRows = result.totalRows;
    importRecord.processedRows = result.processedRows;
    importRecord.errorRows = result.errorRows;
    await importRecord.save();
    
    return {
      importId: importRecord._id,
      status: 'completed',
      totalRows: result.totalRows,
      processedRows: result.processedRows,
      errorRows: result.errorRows
    };
  } catch (error) {
    logger.error('Process file error:', error);
    throw error;
  }
};

const getImportStatus = async (importId) => {
  const importRecord = await Import.findById(importId);
  if (!importRecord) {
    throw new Error('Import not found');
  }
  
  return {
    importId: importRecord._id,
    fileName: importRecord.fileName,
    status: importRecord.status,
    totalRows: importRecord.totalRows,
    processedRows: importRecord.processedRows,
    errorRows: importRecord.errorRows,
    createdAt: importRecord.createdAt,
    updatedAt: importRecord.updatedAt
  };
};

const getImportErrors = async (importId) => {
  const errors = await ImportError.find({ importId });
  return errors;
};

const getTemplate = async (type) => {
  const templatePath = path.join(__dirname, '..', 'templates', `import-template.${type}`);
  try {
    const template = await fs.readFile(templatePath, 'utf8');
    return template;
  } catch (error) {
    throw new Error(`Template not found for type: ${type}`);
  }
};

const listImports = async () => {
  const imports = await Import.find().sort({ createdAt: -1 }).limit(100);
  return imports.map(importRecord => ({
    importId: importRecord._id,
    fileName: importRecord.fileName,
    status: importRecord.status,
    totalRows: importRecord.totalRows,
    processedRows: importRecord.processedRows,
    errorRows: importRecord.errorRows,
    createdAt: importRecord.createdAt
  }));
};

module.exports = {
  processFile,
  getImportStatus,
  getImportErrors,
  getTemplate,
  listImports
};