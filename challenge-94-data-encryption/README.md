## Challenge 94 – Data Encryption

### Overview
Implement data encryption at rest using Node.js crypto module with a web interface for encryption management.

### Features
- Data encryption and decryption using AES-256-GCM
- Key management with rotation capabilities
- Web-based encryption dashboard
- RESTful API for encryption operations
- Environment-based configuration

### Prerequisites
- Node.js 18+

### Setup
1. Install backend dependencies: `cd backend && npm install`
2. Install frontend dependencies: `cd frontend && npm install`

### Run
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run start`

### Environment
- `ENCRYPTION_KEY` (required)
- `ENCRYPTION_ALGORITHM` (default aes-256-gcm)
- `PORT` (default 3000)

### API Endpoints
- `POST /api/encrypt` → Encrypt sensitive data
- `POST /api/decrypt` → Decrypt sensitive data
- `GET /api/keys` → List encryption keys
- `POST /api/rotate-key` → Rotate encryption key
- `GET /health` → Health check

### Directory Structure
- `backend/` - Node.js Express API with encryption service
- `frontend/` - React dashboard application

### Testing
- Unit tests: `cd backend && npm test`
- Manual testing through dashboard UI

### Notes
- Uses Node.js crypto module for encryption
- Implements key rotation functionality
- Provides both API and dashboard interfaces
- Handles encryption/decryption errors gracefully