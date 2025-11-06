#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const execAsync = promisify(exec);

async function rollbackLastMigration() {
  try {
    console.log('Rolling back last migration...');
    
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate:undo', {
      cwd: path.resolve(__dirname, '..', '..')
    });
    
    console.log('Migration rolled back successfully');
    console.log('stdout:', stdout);
    if (stderr) {
      console.log('stderr:', stderr);
    }
  } catch (error) {
    console.error('Rollback failed:', error.message);
    process.exit(1);
  }
}

rollbackLastMigration();