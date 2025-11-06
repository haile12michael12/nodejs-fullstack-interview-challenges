#!/bin/bash

# Script to produce load for memory testing

echo "Producing load for memory testing..."

# Install artillery if not already installed
if ! command -v artillery &> /dev/null; then
    echo "Installing artillery..."
    npm install -g artillery
fi

# Run load test
echo "Running load test..."
npx artillery run tooling/load-test/artillery.yml

echo "Load test completed!"