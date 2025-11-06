#!/bin/bash

# Script to run memory leak tests

echo "Starting memory leak test..."

# Run artillery test
echo "Running load test to generate memory pressure..."
npx artillery run tooling/load-test/artillery.yml

echo "Load test completed."

# Capture heap snapshot
echo "Capturing heap snapshot..."
node backend/src/index.js snapshot

echo "Memory leak test completed."