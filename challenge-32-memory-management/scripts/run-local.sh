#!/bin/bash

# Script to run the memory management challenge locally

echo "Starting memory management challenge..."

# Create snapshots directory
mkdir -p snapshots

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Start backend with GC exposed
echo "Starting backend..."
node --expose-gc --max-old-space-size=1024 backend/src/index.js start &

# Start frontend
echo "Starting frontend..."
cd frontend && npm start &

echo "Memory management challenge started!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:3001"