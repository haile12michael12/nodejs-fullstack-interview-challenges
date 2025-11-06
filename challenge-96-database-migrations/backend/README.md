# Database Migrations Backend

## Overview
This is the backend service for the database migrations challenge. It provides APIs for running, rolling back, and checking the status of database migrations.

## Features
- Run pending migrations
- Rollback last migration
- Check migration status
- RESTful API endpoints
- CLI scripts for migration management

## API Endpoints
- `POST /api/migrations/run` - Run pending migrations
- `POST /api/migrations/rollback` - Rollback last migration
- `GET /api/migrations/status` - Get migration status
- `GET /health` - Health check endpoint

## CLI Scripts
- `node src/cli/runPendingMigrations.js` - Run pending migrations
- `node src/cli/rollbackLastMigration.js` - Rollback last migration

## Environment Variables
- `PORT` - Server port (default: 3000)
- `DB_PATH` - Database file path (default: ./database.sqlite)
- `NODE_ENV` - Environment (default: development)

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Migration Commands
```bash
# Run pending migrations
npm run migrate

# Rollback last migration
npm run migrate:undo
```

## Testing
```bash
npm test
```