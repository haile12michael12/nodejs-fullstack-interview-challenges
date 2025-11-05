const express = require('express');
const cors = require('cors');
const path = require('path');
const backupService = require('./backupService');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'backups')));

// Routes
app.get('/api/backups', async (req, res) => {
  try {
    const backups = await backupService.listBackups();
    res.json(backups);
  } catch (error) {
    logger.error('Failed to list backups', { error: error.message });
    res.status(500).json({ error: 'Failed to list backups' });
  }
});

app.post('/api/backups', async (req, res) => {
  try {
    const { name, encrypt } = req.body;
    const backup = await backupService.createBackup(name, encrypt);
    res.json(backup);
  } catch (error) {
    logger.error('Failed to create backup', { error: error.message });
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

app.post('/api/backups/:filename/restore', async (req, res) => {
  try {
    const { filename } = req.params;
    const result = await backupService.restoreBackup(filename);
    res.json(result);
  } catch (error) {
    logger.error('Failed to restore backup', { error: error.message });
    res.status(500).json({ error: 'Failed to restore backup' });
  }
});

app.delete('/api/backups/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    await backupService.deleteBackup(filename);
    res.json({ message: 'Backup deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete backup', { error: error.message });
    res.status(500).json({ error: 'Failed to delete backup' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;