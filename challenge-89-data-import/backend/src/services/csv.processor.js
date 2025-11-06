const fs = require('fs');
const csv = require('csv-parser');
const { ImportError } = require('../models/importError.model');
const { validateData } = require('../utils/validation');
const { logger } = require('../config/logger');

const process = async (filePath, importId) => {
  return new Promise((resolve, reject) => {
    let totalRows = 0;
    let processedRows = 0;
    let errorRows = 0;
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        totalRows++;
        
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
          logger.error('CSV row processing error:', error);
          errorRows++;
        }
      })
      .on('end', () => {
        logger.info(`CSV processing completed. Total: ${totalRows}, Processed: ${processedRows}, Errors: ${errorRows}`);
        resolve({ totalRows, processedRows, errorRows });
      })
      .on('error', (error) => {
        logger.error('CSV processing error:', error);
        reject(error);
      });
  });
};

module.exports = { process };