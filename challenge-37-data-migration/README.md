## Challenge 37 – Data Migration System

### Overview
Build a robust data migration system with versioning, rollback capabilities, and automated migration execution.

### Features
- Migration versioning and tracking
- Automated migration execution
- Rollback and downgrade capabilities
- Migration dependency management
- Migration status monitoring

### Prerequisites
- Node.js 18+
- Database (MongoDB or PostgreSQL)

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
- `POST /rollback` → Rollback last migration
- `GET /migrations` → List migration status
- `POST /seed` → Run data seeding scripts

### Testing
- Create and execute sample migrations
- Test rollback functionality
- Verify data integrity after migrations
- Test migration dependencies

### Notes
- Implement idempotent migrations
- Use transactions for data consistency
- Track migration execution time
- Handle migration failures gracefully