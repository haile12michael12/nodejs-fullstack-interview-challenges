## Challenge 94 – Data Encryption

### Overview
Implement data encryption at rest to protect sensitive information in databases and files.

### Features
- Field-level encryption
- File encryption
- Key management
- Encryption algorithm selection

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `ENCRYPTION_KEY` (required)
- `ENCRYPTION_ALGORITHM` (default aes-256-gcm)
- `PORT` (default 3000)

### Endpoints
- `POST /encrypt` → Encrypt sensitive data
- `POST /decrypt` → Decrypt sensitive data
- `GET /keys` → List encryption keys
- `POST /rotate-key` → Rotate encryption key

### Testing
- Test field-level encryption
- Verify file encryption functionality
- Check key management
- Validate encryption algorithm selection

### Notes
- Use crypto module for encryption
- Implement proper key rotation
- Add encryption to sensitive model fields
- Handle encryption/decryption errors