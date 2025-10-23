## Challenge 46 – Notification System

### Overview
Create a scalable notification system with multiple channels (email, SMS, push) and delivery guarantees.

### Features
- Multi-channel notification support
- Delivery status tracking
- Retry mechanisms and failure handling
- Notification templates and personalization
- Rate limiting and throttling

### Prerequisites
- Node.js 18+
- Redis for queuing
- SMTP server for email (or service like SendGrid)

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `REDIS_URL` (default redis://localhost:6379)
- `SMTP_HOST` (required for email)
- `SMS_PROVIDER` (default twilio)
- `PORT` (default 3000)

### Endpoints
- `POST /notifications` → Send notification
- `GET /notifications/:id` → Get notification status
- `POST /templates` → Create notification template
- `GET /channels` → List notification channels

### Testing
- Send notifications through different channels
- Test retry mechanisms for failed deliveries
- Verify rate limiting implementation
- Test template personalization

### Notes
- Implement notification queuing for scalability
- Handle delivery receipts and status updates
- Support notification scheduling
- Implement proper error handling and logging