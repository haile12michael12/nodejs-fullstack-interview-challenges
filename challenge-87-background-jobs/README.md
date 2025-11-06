## Challenge 87 – Background Jobs

### Overview
Process background tasks with job queues to handle long-running operations without blocking the main application.

### Features
- Job queue implementation using Bull and Redis
- Task scheduling and prioritization
- Job status tracking and monitoring
- Error handling and automatic retries
- RESTful API for job management
- Web-based dashboard for monitoring jobs
- Support for multiple job types (email, image processing, data export)

### Prerequisites
- Node.js 18+
- Redis server

### Architecture
```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend  │    │    Backend   │    │     Redis    │
│   (React)   │◄──►│ (Express.js) │◄──►│ (Job Queue)  │
└─────────────┘    └──────────────┘    └──────────────┘
```

### Setup
1. Start Redis server:
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7-alpine
   
   # Or install Redis locally
   # macOS: brew install redis
   # Ubuntu: sudo apt-get install redis
   ```

2. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment Variables

#### Backend
- `PORT` - Server port (default: 3000)
- `REDIS_HOST` - Redis server host (default: localhost)
- `REDIS_PORT` - Redis server port (default: 6379)
- `JOB_CONCURRENCY` - Number of concurrent jobs (default: 5)
- `LOG_LEVEL` - Logging level (default: info)

#### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000/api)

### API Endpoints

#### Jobs
- `POST /api/jobs` → Create new background job
- `GET /api/jobs` → List all jobs
- `GET /api/jobs/:id` → Get job details
- `GET /api/jobs/status/:status` → Get jobs by status

### Job Types
1. **Email Jobs** - Send emails asynchronously
2. **Image Processing Jobs** - Process images in the background
3. **Data Export Jobs** - Export data to files

### Testing
- Test job queue processing
- Verify task prioritization
- Check job status tracking
- Validate error handling and retries

### Notes
- Uses Bull for job queue implementation
- Implements clean architecture pattern
- Includes unit and integration tests
- Provides real-time job status updates
- Supports job progress tracking
- Handles job timeout and retries
- Includes web-based dashboard for monitoring