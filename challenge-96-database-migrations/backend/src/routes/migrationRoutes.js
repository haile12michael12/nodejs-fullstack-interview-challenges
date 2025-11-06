const express = require('express');
const router = express.Router();
const {
  runMigrations,
  rollbackMigration,
  getMigrationStatus
} = require('../controllers/migrationsController');

// Run pending migrations
router.post('/run', runMigrations);

// Rollback last migration
router.post('/rollback', rollbackMigration);

// Get migration status
router.get('/status', getMigrationStatus);

module.exports = router;