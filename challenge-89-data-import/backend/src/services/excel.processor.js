const XLSX = require('xlsx');
const { ImportError } = require('../models/importError.model');
const { validateData } = require('../utils/validation');
const { logger } = require('../config/logger');

const process = async (filePath, importId) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    let totalRows = 0;
    let processedRows = 0;
    let errorRows = 0;
    
    for (let i = 0; i < jsonData.length; i++) {
      totalRows++;
      const row = jsonData[i];
      
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
        logger.error('Excel row processing error:', error);
        errorRows++;
      }
    }
    
    logger.info(`Excel processing completed. Total: ${totalRows}, Processed: ${processedRows}, Errors: ${errorRows}`);
    return { totalRows, processedRows, errorRows };
  } catch (error) {
    logger.error('Excel processing error:', error);
    throw error;
  }
};

module.exports = { process };