## Challenge 88 – Email Notifications

### Overview
Send email notifications with templates and handle delivery status tracking.

### Features
- Email template system with Handlebars
- SMTP-based email delivery using Nodemailer
- Email queuing and background processing with Bull and Redis
- Delivery status tracking
- RESTful API for managing templates and sending emails
- Webhook handlers for bounce and spam complaints
- React frontend with Tailwind CSS

### Prerequisites
- Node.js 18+
- Redis server
- SMTP server or email service API (e.g., Gmail, SendGrid)

### Architecture
```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend  │    │    Backend   │    │     Redis    │
│   (React)   │◄──►│ (Express.js) │◄──►│ (Queue/Cache)│
└─────────────┘    └──────────────┘    └──────────────┘
                         │
                         ▼
                   ┌──────────────┐
                   │    SQLite    │
                   │ (Database)   │
                   └──────────────┘
```

### Setup
1. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`

2. Configure environment variables (see `.env.example` files)

3. Start Redis server (or use Docker: `docker run -d -p 6379:6379 redis:7-alpine`)

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment Variables

#### Backend
- `PORT` (default 3000) - Port for the backend server
- `REDIS_URL` (default redis://localhost:6379) - Redis connection URL
- `DATABASE_FILENAME` (default dev.sqlite3) - SQLite database filename
- `SMTP_HOST` (required) - SMTP server hostname
- `SMTP_PORT` (default 587) - SMTP server port
- `SMTP_USER` (required) - SMTP username
- `SMTP_PASS` (required) - SMTP password
- `EMAIL_FROM` (required) - Default sender email address

### API Endpoints

#### Emails
- `POST /api/emails/send` → Send email notification
- `GET /api/emails` → List all emails with status
- `GET /api/emails/:id` → Get email details

#### Templates
- `POST /api/templates` → Create email template
- `GET /api/templates` → List email templates
- `GET /api/templates/:id` → Get template details
- `PUT /api/templates/:id` → Update template
- `DELETE /api/templates/:id` → Delete template

### Docker Support
This project includes Docker support for easy deployment:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

### Testing
- Test email template rendering
- Verify SMTP delivery
- Check email queuing and processing
- Validate delivery status tracking
- Test webhook handlers

### Notes
- Uses Nodemailer for email sending
- Implements Handlebars for email templating
- Uses Bull for email queuing and background processing
- Stores data in SQLite database via Knex.js ORM
- Provides RESTful API for integration
- Includes webhook handlers for bounce and spam complaints
- Frontend built with React and Tailwind CSS