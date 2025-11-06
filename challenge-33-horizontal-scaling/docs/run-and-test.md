# Running and Testing the Horizontal Scaling Setup

## Prerequisites
- Docker and Docker Compose
- Node.js 18+
- npm or yarn

## Running with Docker Compose (Recommended)

### 1. Start the Environment
```bash
docker-compose up -d
```

This will start:
- Redis for session storage
- Two backend instances
- Nginx load balancer
- Frontend application

### 2. Access the Applications
- Frontend: http://localhost:3000
- Backend API through load balancer: http://localhost/api/health
- Direct backend access: http://localhost:3001, http://localhost:3002

### 3. Scaling Backend Instances
```bash
# Scale to 4 backend instances
docker-compose up -d --scale backend1=2 --scale backend2=2
```

## Running Locally

### 1. Start Redis
```bash
docker run -d --name redis -p 6379:6379 redis:7-alpine
```

### 2. Start Backend Workers
```bash
# Terminal 1
cd backend
PORT=3001 npm run dev

# Terminal 2
cd backend
PORT=3002 npm run dev

# Terminal 3
cd backend
PORT=3003 npm run dev
```

### 3. Start Load Balancer
```bash
# Terminal 4
cd lb
node node-lb.js
```

### 4. Start Frontend
```bash
# Terminal 5
cd frontend
npm start
```

## Testing

### 1. Health Checks
```bash
# Check backend health
curl http://localhost:3001/health
curl http://localhost:3002/health

# Check load balancer health
curl http://localhost/health
```

### 2. Session Management
```bash
# Create a session
curl -X POST http://localhost/api/session -H "Content-Type: application/json" -d '{"test": "data"}'

# Get session data
curl http://localhost/api/session

# Update session data
curl -X PUT http://localhost/api/session -H "Content-Type: application/json" -d '{"updated": "data"}'

# Delete session
curl -X DELETE http://localhost/api/session
```

### 3. Statistics
```bash
# Get current stats
curl http://localhost/api/stats

# Get stats history
curl http://localhost/api/stats/history
```

### 4. Scaling
```bash
# Scale up
curl -X POST http://localhost/api/scale/up

# Scale down
curl -X POST http://localhost/api/scale/down
```

## Testing with Load

### Using Apache Bench (ab)
```bash
# Test with 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost/health
```

### Using wrk
```bash
# Test with 2 threads, 10 connections for 30 seconds
wrk -t2 -c10 -d30s http://localhost/health
```

## Monitoring

### 1. Docker Stats
```bash
# Monitor container resource usage
docker stats
```

### 2. Application Logs
```bash
# View backend logs
docker-compose logs backend1

# View load balancer logs
docker-compose logs nginx
```

### 3. Redis Monitoring
```bash
# Connect to Redis and monitor
docker exec -it redis redis-cli
> monitor
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Ensure ports 80, 3000-3003, and 6379 are available
   - Stop conflicting services or change port mappings

2. **Connection Refused**
   - Check if all services are running
   - Verify Docker containers are healthy
   - Check firewall settings

3. **Session Stickiness Issues**
   - Verify cookie settings in load balancer
   - Check browser cookie policies
   - Test with curl to bypass browser restrictions

### Debugging Steps

1. **Check Service Status**
   ```bash
   docker-compose ps
   ```

2. **View Logs**
   ```bash
   docker-compose logs --tail=100
   ```

3. **Test Individual Services**
   ```bash
   curl http://localhost:3001/health
   ```

4. **Check Network Connectivity**
   ```bash
   docker network ls
   docker network inspect challenge-33-horizontal-scaling_default
   ```