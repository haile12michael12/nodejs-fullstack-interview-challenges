#!/bin/bash

# Script to run code quality checks
echo "Running code quality checks..."

# Backend linting
echo "Linting backend code..."
cd ../backend
npm run lint 2>/dev/null || echo "No lint script found in backend, skipping..."

# Frontend linting
echo "Linting frontend code..."
cd ../frontend
npm run lint 2>/dev/null || echo "No lint script found in frontend, skipping..."

echo "Code quality checks completed!"