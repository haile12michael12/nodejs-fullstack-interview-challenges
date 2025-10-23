## Challenge 87 – Background Jobs

### Overview
Process background tasks with job queues to handle long-running operations without blocking the main application.

### Features
- Job queue implementation
- Task scheduling and prioritization
- Job status tracking and monitoring
- Error handling and retries

### Prerequisites
- Node.js 18+
- Redis or database for job storage

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `JOB_QUEUE_CONCURRENCY` (default 5)
- `JOB_RETRY_ATTEMPTS` (default 3)
- `REDIS_URL` (optional)
- `PORT` (default 3000)

### Endpoints
- `POST /jobs` → Create new background job
- `GET /jobs/:id` → Get job status
- `GET /jobs` → List all jobs
- `DELETE /jobs/:id` → Cancel job

### Testing
- Test job queue processing
- Verify task prioritization
- Check job status tracking
- Validate error handling and retries

### Notes
- Use Bull or Bee-Queue for job processing
- Implement job progress tracking
- Add job timeout handling
- Support delayed and scheduled jobs