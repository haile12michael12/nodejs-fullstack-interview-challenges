# Data Backup Frontend

## Overview
This is the frontend dashboard for the data backup challenge. It provides a user interface to manage backups including creating, listing, restoring, and deleting backups.

## Features
- View list of available backups
- Create new backups with optional encryption
- Restore backups
- Delete backups
- Responsive design

## Pages
- **BackupList** - Displays all available backups in card format
- **CreateBackup** - Form to create a new backup
- **RestoreBackup** - Interface to restore a selected backup

## Components
- **Navbar** - Navigation menu
- **BackupCard** - Displays individual backup information

## API
- **backupApi.js** - Axios client for communicating with backend services

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