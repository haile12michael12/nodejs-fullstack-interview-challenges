const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const execAsync = promisify(exec);

const runMigrations = async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate', {
      cwd: path.resolve(__dirname, '..')
    });
    
    res.json({
      success: true,
      message: 'Migrations completed successfully',
      stdout,
      stderr
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Migration failed',
      error: error.message
    });
  }
};

const rollbackMigration = async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate:undo', {
      cwd: path.resolve(__dirname, '..')
    });
    
    res.json({
      success: true,
      message: 'Migration rolled back successfully',
      stdout,
      stderr
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Rollback failed',
      error: error.message
    });
  }
};

const getMigrationStatus = async (req, res) => {
  try {
    // In a real implementation, we would check the SequelizeMeta table
    // For this demo, we'll return a mock response
    res.json({
      success: true,
      status: 'All migrations up to date',
      pendingMigrations: 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get migration status',
      error: error.message
    });
  }
};

module.exports = {
  runMigrations,
  rollbackMigration,
  getMigrationStatus
};