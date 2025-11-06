# API Versioning Backend

## Overview
This is the backend service for the API versioning challenge. It implements API versioning using Express.js with support for multiple API versions.

## Features
- Support for multiple API versions (v1, v2)
- Version detection through URL paths and Accept headers
- Deprecation management for older API versions
- Warning headers for deprecated versions
- Backward compatibility

## API Endpoints
- `GET /api/v1/users` - Get users (v1)
- `GET /api/v1/users/:id` - Get user by ID (v1)
- `POST /api/v1/users` - Create user (v1)
- `PUT /api/v1/users/:id` - Update user (v1)
- `DELETE /api/v1/users/:id` - Delete user (v1)
- `GET /api/v2/users` - Get users (v2)
- `GET /api/v2/users/:id` - Get user by ID (v2)
- `POST /api/v2/users` - Create user (v2)
- `PUT /api/v2/users/:id` - Update user (v2)
- `DELETE /api/v2/users/:id` - Delete user (v2)
- `PATCH /api/v2/users/:id/activate` - Activate user (v2)

## Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)

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