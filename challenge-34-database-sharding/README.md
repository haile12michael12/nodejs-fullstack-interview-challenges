## Challenge 34 – Database Sharding

### Overview
Implement database sharding strategies for handling large datasets and improving performance.

### Features
- Horizontal partitioning strategies
- Shard key selection and distribution
- Cross-shard queries and transactions
- Shard rebalancing and migration
- Failover and redundancy

### Prerequisites
- Node.js 18+
- MongoDB or PostgreSQL

### Setup
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Run
- Backend: `npm start` in `backend`
- Frontend: `npm start` in `frontend`

### Environment
- `DATABASE_URL` (shard configuration)
- `SHARD_COUNT` (default 4)
- `PORT` (default 3000)

### Endpoints
- `POST /data` → Insert data (determine appropriate shard)
- `GET /data/:id` → Retrieve data (locate correct shard)
- `GET /shards` → Get shard information
- `POST /rebalance` → Trigger shard rebalancing

### Testing
- Distribute data across multiple shards
- Test query performance with sharding
- Simulate shard failures and recovery
- Test rebalancing operations

### Notes
- Implement consistent hashing for shard distribution
- Handle cross-shard transactions appropriately
- Monitor shard balance and performance
- Plan for shard growth and scaling