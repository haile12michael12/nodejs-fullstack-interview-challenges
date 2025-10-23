## Challenge 67 – Password Security

### Overview
Implement secure password hashing, storage, and management with industry best practices.

### Features
- Secure password hashing with bcrypt or Argon2
- Password strength validation
- Password reset functionality
- Account lockout mechanisms

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `PASSWORD_HASH_ROUNDS` (default 12)
- `LOCKOUT_ATTEMPTS` (default 5)
- `LOCKOUT_DURATION` (default 30 minutes)
- `PORT` (default 3000)

### Endpoints
- `POST /register` → Register new user with secure password
- `POST /login` → Authenticate user with password
- `POST /reset-password` → Initiate password reset
- `POST /change-password` → Change password for authenticated user

### Testing
- Test password hashing and verification
- Verify password strength requirements
- Test account lockout after failed attempts
- Validate password reset workflow

### Notes
- Use bcrypt or Argon2 for password hashing
- Implement proper salt generation
- Add rate limiting to prevent brute force attacks
- Store only hashed passwords, never plain text