# Background Jobs Frontend

## Overview
This is the frontend application for the background jobs challenge. It provides a user interface for creating and monitoring background jobs.

## Features
- Job creation form
- Real-time job status display
- Job list with filtering capabilities
- Responsive design with Tailwind CSS

## Prerequisites
- Node.js 16+

## Installation
```bash
npm install
```

## Environment Variables
Create a `.env` file based on `.env.example`:
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000/api)

## Running the Application
```bash
# Development mode
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure
- `src/api/` - API service functions
- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/App.jsx` - Main application component
- `src/main.jsx` - Application entry point

## Technologies
- React 18
- Vite
- Tailwind CSS
- Axios