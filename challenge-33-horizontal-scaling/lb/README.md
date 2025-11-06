# Node.js Load Balancer

## Overview
This is a simple Node.js load balancer implementation that provides round-robin load balancing with sticky session support.

## Features
- Round-robin load balancing algorithm
- Sticky session support using cookies
- WebSocket support
- Error handling
- Health check capabilities

## How it works
1. The load balancer maintains a list of backend servers
2. For each incoming request, it selects a backend server using round-robin algorithm
3. If a sticky session cookie is present, it routes the request to the same backend server
4. It adds a sticky session cookie to the response for future requests
5. WebSocket connections are also properly proxied

## Configuration
The load balancer can be configured through environment variables:
- `LB_PORT` - Port to listen on (default: 8080)

## Backend Servers
The load balancer is configured to distribute traffic to the following backend servers:
- http://localhost:3001
- http://localhost:3002
- http://localhost:3003

## Installation
```bash
npm install
```

## Running the Load Balancer
```bash
node node-lb.js
```