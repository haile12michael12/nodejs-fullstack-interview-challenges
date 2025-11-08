# Challenge 79 – CORS Security

## Overview
Implement CORS policies and security measures to control resource sharing between different origins.

## Features
- CORS configuration and middleware
- Origin whitelisting and validation
- HTTP method and header restrictions
- Credential handling and security
- Real-time CORS testing dashboard

## Prerequisites
- Node.js 18+

## Setup
1. Backend: `cd backend && npm install`
2. Frontend: `cd frontend && npm install`

## Run
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm start`

## Environment
- `CORS_ORIGIN` (default *)
- `CORS_CREDENTIALS` (default false)
- `PORT` (default 3000)

## Endpoints
- All existing endpoints with CORS headers
- `GET /cors/config` → Get current CORS configuration
- `POST /cors/update` → Update CORS settings
- `GET /cors/origins` → Get allowed origins
- `POST /cors/origins/add` → Add origin to whitelist
- `POST /cors/origins/remove` → Remove origin from whitelist

## Testing
- Test CORS header implementation
- Verify origin validation
- Check preflight request handling
- Validate credential restrictions

## Notes
- Implement proper CORS middleware
- Use environment-specific CORS settings
- Handle preflight OPTIONS requests
- Prevent overly permissive CORS policies
- Frontend dashboard for testing CORS policies

## Docker
To run with Docker:
1. `docker-compose up --build`
2. Access frontend at http://localhost:3001
3. Access backend API at http://localhost:3000