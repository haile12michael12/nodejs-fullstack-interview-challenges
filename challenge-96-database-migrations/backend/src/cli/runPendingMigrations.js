#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const execAsync = promisify(exec);

async function runPendingMigrations() {
  try {
    console.log('Running pending migrations...');
    
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate', {
      cwd: path.resolve(__dirname, '..', '..')
    });
    
    console.log('Migrations completed successfully');
    console.log('stdout:', stdout);
    if (stderr) {
      console.log('stderr:', stderr);
    }
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

runPendingMigrations();