const fs = require('fs').promises;
const path = require('path');

const getMigrationFiles = async () => {
  try {
    const migrationsDir = path.join(__dirname, '..', '..', 'migrations');
    const files = await fs.readdir(migrationsDir);
    return files.filter(file => file.endsWith('.js'));
  } catch (error) {
    throw new Error(`Failed to read migrations directory: ${error.message}`);
  }
};

const validateMigrationFile = (filename) => {
  // Check if filename follows the pattern: timestamp-description.js
  const pattern = /^\d{14}-[a-z0-9-]+\.js$/;
  return pattern.test(filename);
};

const getPendingMigrations = async () => {
  // In a real implementation, we would compare migration files with the SequelizeMeta table
  // For this demo, we'll return a mock response
  return [];
};

module.exports = {
  getMigrationFiles,
  validateMigrationFile,
  getPendingMigrations
};