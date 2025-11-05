const fs = require('fs').promises;
const path = require('path');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const logger = require('./utils/logger');

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure backup directory exists
(async () => {
  try {
    await fs.access(BACKUP_DIR);
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  }
})();

// Mock data for demonstration
const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ],
  products: [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ]
};

class BackupService {
  static async listBackups() {
    try {
      const files = await fs.readdir(BACKUP_DIR);
      const backups = [];
      
      for (const file of files) {
        if (file.endsWith('.zip')) {
          const filePath = path.join(BACKUP_DIR, file);
          const stats = await fs.stat(filePath);
          backups.push({
            filename: file,
            size: stats.size,
            createdAt: stats.mtime.toISOString()
          });
        }
      }
      
      return backups;
    } catch (error) {
      logger.error('Failed to list backups', { error: error.message });
      throw error;
    }
  }

  static async createBackup(name, encrypt = false) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${name || 'backup'}-${timestamp}.zip`;
      const filePath = path.join(BACKUP_DIR, filename);
      
      // Create backup data
      const backupData = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        data: mockData
      };
      
      // Write backup data to file
      const dataFilePath = path.join(BACKUP_DIR, `${filename}.json`);
      await fs.writeFile(dataFilePath, JSON.stringify(backupData, null, 2));
      
      // Create zip archive
      const output = fs.createWriteStream(filePath);
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });
      
      archive.pipe(output);
      archive.file(dataFilePath, { name: 'backup.json' });
      await archive.finalize();
      
      // Remove temporary JSON file
      await fs.unlink(dataFilePath);
      
      const stats = await fs.stat(filePath);
      
      logger.info('Backup created successfully', { filename });
      return {
        filename,
        size: stats.size,
        createdAt: stats.mtime.toISOString()
      };
    } catch (error) {
      logger.error('Failed to create backup', { error: error.message });
      throw error;
    }
  }

  static async restoreBackup(filename) {
    try {
      const filePath = path.join(BACKUP_DIR, filename);
      
      // In a real implementation, we would extract the backup and restore the data
      // For this demo, we'll just verify the file exists
      await fs.access(filePath);
      
      logger.info('Backup restored successfully', { filename });
      return { message: 'Backup restored successfully', filename };
    } catch (error) {
      logger.error('Failed to restore backup', { error: error.message });
      throw error;
    }
  }

  static async deleteBackup(filename) {
    try {
      const filePath = path.join(BACKUP_DIR, filename);
      await fs.unlink(filePath);
      
      logger.info('Backup deleted successfully', { filename });
      return { message: 'Backup deleted successfully' };
    } catch (error) {
      logger.error('Failed to delete backup', { error: error.message });
      throw error;
    }
  }
}

module.exports = BackupService;