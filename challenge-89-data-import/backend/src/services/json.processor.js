const fs = require('fs').promises;
const { ImportError } = require('../models/importError.model');
const { validateData } = require('../utils/validation');
const { logger } = require('../config/logger');

const process = async (filePath, importId) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    let totalRows = 0;
    let processedRows = 0;
    let errorRows = 0;
    
    // Handle array of objects
    const rows = Array.isArray(jsonData) ? jsonData : [jsonData];
    
    for (let i = 0; i < rows.length; i++) {
      totalRows++;
      const row = rows[i];
      
      try {
        // Validate row data
        const validationResult = validateData(row);
        
        if (validationResult.isValid) {
          // Process valid row (save to database)
          // This is where you would save to your actual database
          processedRows++;
        } else {
          // Save error to database
          await ImportError.create({
            importId,
            rowNumber: totalRows,
            rowData: row,
            errorMessage: validationResult.errors.join(', ')
          });
          errorRows++;
        }
      } catch (error) {
        logger.error('JSON row processing error:', error);
        errorRows++;
      }
    }
    
    logger.info(`JSON processing completed. Total: ${totalRows}, Processed: ${processedRows}, Errors: ${errorRows}`);
    return { totalRows, processedRows, errorRows };
  } catch (error) {
    logger.error('JSON processing error:', error);
    throw error;
  }
};

module.exports = { process };