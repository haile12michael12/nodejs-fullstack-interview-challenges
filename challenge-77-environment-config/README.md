## Challenge 77 – Environment Configuration

### Overview
Manage environment-specific configurations with proper separation of concerns and security practices.

### Features
- Environment variable management
- Configuration validation
- Multiple environment support (dev, test, staging, prod)
- Secure secret management

### Prerequisites
- Node.js 18+

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `NODE_ENV` (default development)
- `PORT` (default 3000)
- `DB_HOST` (required)
- `DB_PORT` (default 5432)
- `API_KEY` (required for external services)

### Testing
- Test configuration loading for different environments
- Verify environment variable validation
- Check default value handling
- Validate secret management

### Notes
- Use dotenv for environment variable loading
- Implement configuration validation
- Separate sensitive configuration from code
- Use different config files for each environment