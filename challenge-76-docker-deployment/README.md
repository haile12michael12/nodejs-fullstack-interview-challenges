## Challenge 76 – Docker Deployment

### Overview
Containerize applications with Docker for consistent deployment across environments.

### Features
- Multi-stage Docker builds
- Docker Compose for multi-container setups
- Environment-specific configurations
- Container security best practices

### Prerequisites
- Node.js 18+
- Docker and Docker Compose

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- `docker-compose up` in challenge root
- `docker build -t app .` in backend or frontend

### Environment
- `DOCKER_ENV` (default production)
- `CONTAINER_PORT` (default 3000)

### Testing
- Build and run Docker containers
- Test multi-container setups with Docker Compose
- Verify environment variable injection
- Validate container security configurations

### Notes
- Use .dockerignore to exclude unnecessary files
- Implement health checks in Dockerfiles
- Use multi-stage builds to reduce image size
- Set proper user permissions in containers