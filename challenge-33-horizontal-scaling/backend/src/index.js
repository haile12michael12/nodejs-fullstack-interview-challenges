const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require('./config/default');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < Math.min(numCPUs, config.maxWorkers); i++) {
    cluster.fork();
  }

  // Handle worker exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Fork a new worker to replace the dead one
    cluster.fork();
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Master received SIGTERM, shutting down gracefully');
    for (const worker in cluster.workers) {
      cluster.workers[worker].kill();
    }
  });

  process.on('SIGINT', () => {
    console.log('Master received SIGINT, shutting down gracefully');
    for (const worker in cluster.workers) {
      cluster.workers[worker].kill();
    }
  });
} else {
  // Worker processes
  require('./worker');
}