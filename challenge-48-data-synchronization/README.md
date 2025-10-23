## Challenge 48 – Data Synchronization

### Overview
Build offline/online data synchronization for mobile applications with conflict resolution and delta sync.

### Features
- Offline data storage and caching
- Delta synchronization algorithms
- Conflict detection and resolution
- Sync scheduling and bandwidth optimization
- Multi-device synchronization

### Prerequisites
- Node.js 18+
- Database (MongoDB or PostgreSQL)
- Client-side storage (IndexedDB or SQLite)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DATABASE_URL` (required)
- `SYNC_INTERVAL` (default 30 seconds)
- `PORT` (default 3000)

### Endpoints
- `POST /sync` → Sync data with server
- `GET /changes/:timestamp` → Get changes since timestamp
- `POST /resolve-conflict` → Resolve data conflicts
- `GET /devices` → List synchronized devices

### Testing
- Test offline data storage and retrieval
- Verify synchronization after connectivity restored
- Test conflict resolution scenarios
- Validate multi-device synchronization

### Notes
- Implement vector clocks for conflict detection
- Handle partial sync for bandwidth efficiency
- Support incremental sync with change tracking
- Provide sync status and progress feedback