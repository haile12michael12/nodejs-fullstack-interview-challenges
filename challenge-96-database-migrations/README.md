## Challenge 96 – Database Migrations

### Overview
Implement database migration systems to manage schema changes and data updates.

### Features
- Migration script creation and execution
- Migration versioning and tracking
- Rollback and downgrade capabilities
- Migration status monitoring

### Prerequisites
- Node.js 18+
- Database (PostgreSQL, MySQL, etc.)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DATABASE_URL` (required)
- `MIGRATIONS_DIR` (default ./migrations)
- `PORT` (default 3000)

### Endpoints
- `POST /migrate` → Run pending migrations
- `POST /migrate/rollback` → Rollback last migration
- `GET /migrate/status` → Get migration status
- `POST /migrate/create` → Create new migration

### Testing
- Test migration script execution
- Verify migration version tracking
- Check rollback functionality
- Validate migration status reporting

### Notes
- Use Sequelize CLI or similar migration tool
- Implement idempotent migrations
- Add migration transaction handling
- Handle migration dependencies