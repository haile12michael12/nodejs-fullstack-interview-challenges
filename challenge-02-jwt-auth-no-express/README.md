## Challenge 02 – JWT Auth (No Express)

### Overview
Implement login and protected routes using Node's built-in `http` module. Create and verify JWTs manually using `crypto` (no `jsonwebtoken`).

### Features
- Manual JWT creation/verification (HS256)
- Login, refresh, and protected endpoints
- Minimal React frontend for login and testing

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` (or `npm run dev`) in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `JWT_SECRET` (required)
- `PORT` (default 3000)

### Endpoints (example)
- `POST /login` → returns `{ token, refreshToken }`
- `GET /me` (Authorization: Bearer <token>)

### Testing
- Backend tests: `npm test` in `backend` (if present)

### Notes
- No Express; use only `http` and `crypto`.

