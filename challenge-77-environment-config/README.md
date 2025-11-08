# Challenge 77 – Environment Configuration

## Overview
Manage environment-specific configurations with proper separation of concerns and security practices.

## Features
- Environment variable management
- Configuration validation
- Multiple environment support (dev, test, staging, prod)
- Secure secret management
- Real-time configuration monitoring

## Prerequisites
- Node.js 18+

## Setup
1. Backend: `cd backend && npm install`
2. Frontend: `cd frontend && npm install`

## Run
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm start`

## Environment
- `NODE_ENV` (default development)
- `PORT` (default 3000)
- `DB_HOST` (required)
- `DB_PORT` (default 5432)
- `API_KEY` (required for external services)

## Testing
- Test configuration loading for different environments
- Verify environment variable validation
- Check default value handling
- Validate secret management

## Notes
- Use dotenv for environment variable loading
- Implement configuration validation
- Separate sensitive configuration from code
- Use different config files for each environment

## Docker
To run with Docker:
1. `docker-compose up --build`
2. Access frontend at http://localhost:3001
3. Access backend API at http://localhost:3000