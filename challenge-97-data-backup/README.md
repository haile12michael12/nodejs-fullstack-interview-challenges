## Challenge 97 – Data Backup

### Overview
Create a comprehensive data backup solution with automated scheduling, compression, encryption, and a web interface for management.

### Features
- Automated backup scheduling
- Backup compression using ZIP
- Backup encryption (optional)
- Backup storage management
- Backup restoration procedures
- Web-based management interface
- RESTful API for backup operations

### Prerequisites
- Node.js 18+

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run start`

### Environment
- `BACKUP_SCHEDULE` (default 0 2 * * *)
- `BACKUP_STORAGE` (default ./backups)
- `BACKUP_ENCRYPTION` (default enabled)
- `PORT` (default 3000)

### API Endpoints
- `GET /api/backups` → List available backups
- `POST /api/backups` → Create manual backup
- `POST /api/backups/:filename/restore` → Restore from backup
- `DELETE /api/backups/:filename` → Delete backup
- `GET /health` → Health check

### Directory Structure
- `backend/` - Node.js Express API with backup service
- `frontend/` - React dashboard application
- `backups/` - Backup storage directory

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Implements backup retention policies
- Includes backup integrity verification
- Supports both manual and scheduled backups
- Provides web interface for backup management