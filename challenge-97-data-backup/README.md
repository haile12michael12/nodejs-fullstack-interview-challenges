## Challenge 97 – Data Backup

### Overview
Create automated data backup solutions to protect against data loss and enable recovery.

### Features
- Automated backup scheduling
- Backup compression and encryption
- Backup storage management
- Backup restoration procedures

### Prerequisites
- Node.js 18+
- Database for backup

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `BACKUP_SCHEDULE` (default 0 2 * * *)
- `BACKUP_STORAGE` (default ./backups)
- `BACKUP_ENCRYPTION` (default enabled)
- `PORT` (default 3000)

### Endpoints
- `POST /backup` → Create manual backup
- `GET /backup/list` → List available backups
- `POST /backup/restore/:id` → Restore from backup
- `DELETE /backup/:id` → Delete backup

### Testing
- Test automated backup scheduling
- Verify backup compression
- Check backup encryption
- Validate restoration procedures

### Notes
- Implement backup retention policies
- Add backup integrity verification
- Handle large database backups
- Support incremental backups