## Challenge 88 – Email Notifications

### Overview
Send email notifications with templates and handle delivery status tracking.

### Features
- Email template system
- SMTP and API-based email delivery
- Email scheduling and queuing
- Delivery status tracking

### Prerequisites
- Node.js 18+
- SMTP server or email service API

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `SMTP_HOST` (required)
- `SMTP_PORT` (default 587)
- `EMAIL_FROM` (required)
- `PORT` (default 3000)

### Endpoints
- `POST /emails` → Send email notification
- `GET /emails/:id` → Get email status
- `POST /emails/templates` → Create email template
- `GET /emails/templates` → List email templates

### Testing
- Test email template rendering
- Verify SMTP delivery
- Check email scheduling
- Validate delivery status tracking

### Notes
- Use Nodemailer for email sending
- Implement email template engine
- Add email validation
- Handle bounce and spam complaints