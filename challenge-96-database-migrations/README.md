## Challenge 96 – Database Migrations

### Overview
Implement a database migration system using Sequelize with a web interface for managing migrations.

### Features
- Migration script creation and execution
- Migration versioning and tracking
- Rollback and downgrade capabilities
- Migration status monitoring
- Web-based migration management interface
- RESTful API for migration operations

### Prerequisites
- Node.js 18+
- SQLite (for simplicity)

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run start`

### Environment
- `DB_PATH` (default ./database.sqlite)
- `MIGRATIONS_DIR` (default ./migrations)
- `PORT` (default 3000)

### API Endpoints
- `POST /api/migrations/run` → Run pending migrations
- `POST /api/migrations/rollback` → Rollback last migration
- `GET /api/migrations/status` → Get migration status
- `GET /health` → Health check

### CLI Scripts
- `node src/cli/runPendingMigrations.js` → Run pending migrations
- `node src/cli/rollbackLastMigration.js` → Rollback last migration

### Directory Structure
- `backend/` - Node.js Express API with Sequelize migrations
- `frontend/` - React dashboard application
- `migrations/` - Migration files

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Uses Sequelize CLI for migration management
- Implements transaction-safe migrations
- Provides both API and CLI interfaces
- Includes sample user table migration