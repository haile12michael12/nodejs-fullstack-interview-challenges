# Email Notifications Frontend

## Overview
This is the frontend application for the email notifications challenge. It provides a user interface for managing email templates, sending emails, and tracking email status.

## Features
- Email template management (create, edit, delete)
- Email composition and sending
- Email status tracking
- Responsive design with Tailwind CSS
- Real-time notifications

## Pages
- **Dashboard**: Overview of templates and recent emails
- **Templates**: Manage email templates
- **Send Email**: Compose and send emails using templates

## Components
- **TemplateForm**: Create/edit email templates
- **EmailForm**: Compose emails using templates
- **EmailStatusList**: Display email delivery status
- **NotificationToast**: User feedback notifications

## Services
- **api.js**: Axios wrapper for backend API calls
- **useFetch.js**: Custom hook for data fetching

## Installation
```bash
npm install
```

## Running the Application
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000/api)

## Technologies
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM