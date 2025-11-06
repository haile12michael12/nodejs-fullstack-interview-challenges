#!/bin/bash

# Script to capture heap snapshot

echo "Capturing heap snapshot..."

# Create snapshots directory if it doesn't exist
mkdir -p snapshots

# Capture heap snapshot using the backend CLI
node backend/src/index.js snapshot

echo "Heap snapshot captured successfully!"