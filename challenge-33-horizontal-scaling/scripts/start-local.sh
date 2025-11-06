#!/bin/bash

# Start local horizontal scaling environment

echo "Starting horizontal scaling environment..."

# Start Redis
echo "Starting Redis..."
docker run -d --name redis -p 6379:6379 redis:7-alpine

# Start backend workers
echo "Starting backend workers..."
for i in {1..3}
do
  PORT=$((3000 + $i))
  echo "Starting backend worker on port $PORT"
  NODE_ENV=production PORT=$PORT node backend/src/worker.js &
done

# Start load balancer
echo "Starting load balancer..."
node lb/node-lb.js &

# Start frontend
echo "Starting frontend..."
cd frontend && npm start

echo "Environment started successfully!"