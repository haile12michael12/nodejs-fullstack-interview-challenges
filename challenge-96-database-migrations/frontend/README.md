# Database Migrations Frontend

## Overview
This is the frontend dashboard for the database migrations challenge. It provides a user interface to manage database migrations including running, rolling back, and checking the status of migrations.

## Features
- View migration status
- Run pending migrations
- Rollback last migration
- Responsive design

## Pages
- **MigrationDashboard** - Main dashboard for migration management

## Components
- **MigrationStatusTable** - Displays current migration status

## API
- **migrationApi.js** - Axios client for communicating with backend services

## Installation
```bash
npm install
```

## Running the Service
```bash
# Development mode
npm run start

# Production build
npm run build
```

## Development
The frontend is built with React and Vite, running on port 3001. It proxies API requests to the backend service running on port 3000.