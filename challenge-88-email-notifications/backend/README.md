# Email Notifications Backend

## Overview
This is the backend service for the email notifications challenge. It provides APIs for managing email templates, sending emails, and tracking email status.

## Features
- Email template management (CRUD operations)
- Email sending with background processing
- Email status tracking
- Webhook handlers for bounces and spam complaints
- SQLite database for storing templates and email records
- Redis queue for background email processing

## API Endpoints
- `POST /api/emails/send` - Send an email
- `GET /api/emails/status/:id` - Get email status
- `GET /api/emails` - Get all emails
- `POST /api/templates` - Create a new email template
- `GET /api/templates` - Get all email templates
- `GET /api/templates/:id` - Get a specific email template
- `PUT /api/templates/:id` - Update an email template
- `DELETE /api/templates/:id` - Delete an email template
- `POST /api/webhooks/bounce` - Handle email bounce webhook
- `POST /api/webhooks/spam` - Handle spam complaint webhook
- `GET /health` - Health check endpoint

## Environment Variables
- `PORT` - Server port (default: 3000)
- `REDIS_HOST` - Redis host (default: localhost)
- `REDIS_PORT` - Redis port (default: 6379)
- `SMTP_HOST` - SMTP host (default: localhost)
- `SMTP_PORT` - SMTP port (default: 1025)
- `SMTP_USER` - SMTP username (default: test)
- `SMTP_PASS` - SMTP password (default: test)
- `EMAIL_FROM` - Default sender email (default: noreply@example.com)

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Migrations
```bash
npx knex migrate:latest
```