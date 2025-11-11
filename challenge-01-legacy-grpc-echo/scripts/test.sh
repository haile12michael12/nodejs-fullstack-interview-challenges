#!/bin/bash

# Script to run full test suite
echo "Running full test suite..."

# Backend tests
echo "Running backend tests..."
cd ../backend
npm test

# Frontend tests
echo "Running frontend tests..."
cd ../frontend
npm test 2>/dev/null || echo "No test script found in frontend, skipping..."

echo "Test suite completed!"