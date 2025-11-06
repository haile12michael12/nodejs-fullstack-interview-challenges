#!/bin/bash

# Script to capture heap snapshot using Node.js inspector

echo "Capturing heap snapshot..."

# Check if Node.js inspector is available
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed"
    exit 1
fi

# Capture heap snapshot
node backend/src/index.js snapshot

echo "Heap snapshot captured successfully."