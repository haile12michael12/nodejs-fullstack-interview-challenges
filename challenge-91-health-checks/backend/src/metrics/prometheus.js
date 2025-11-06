const client = require('prom-client');
const gcStats = require('prometheus-gc-stats');

// Enable default metrics
client.collectDefaultMetrics({ timeout: 5000 });

// Create custom metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const dbQueryDuration = new client.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['query_type', 'table']
});

const slowQueriesTotal = new client.Counter({
  name: 'slow_queries_total',
  help: 'Total number of slow queries',
  labelNames: ['query_type', 'table']
});

// Initialize GC stats
gcStats();

const getMetrics = async () => {
  return await client.register.metrics();
};

const getContentType = () => {
  return client.register.contentType;
};

module.exports = {
  httpRequestDuration,
  httpRequestTotal,
  dbQueryDuration,
  slowQueriesTotal,
  getMetrics,
  getContentType
};