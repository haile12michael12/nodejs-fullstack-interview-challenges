#!/usr/bin/env node

const { program } = require('commander');
const app = require('./server');
const heapHelper = require('./lib/heapHelper');
const gcManager = require('./lib/gcManager');

program
  .name('memory-management')
  .description('CLI for memory management tools')
  .version('1.0.0');

program
  .command('start')
  .description('Start the Express server')
  .option('-p, --port <port>', 'Port to listen on', '3000')
  .action((options) => {
    const port = process.env.PORT || options.port;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });

program
  .command('profile')
  .description('Run memory profiling')
  .option('-d, --duration <seconds>', 'Duration to profile', '60')
  .action(async (options) => {
    console.log(`Starting memory profiling for ${options.duration} seconds...`);
    // Implementation would go here
    process.exit(0);
  });

program
  .command('snapshot')
  .description('Capture heap snapshot')
  .option('-o, --output <file>', 'Output file name')
  .action(async (options) => {
    try {
      const filename = await heapHelper.captureSnapshot(options.output);
      console.log(`Heap snapshot saved to ${filename}`);
      process.exit(0);
    } catch (error) {
      console.error('Failed to capture heap snapshot:', error);
      process.exit(1);
    }
  });

program.parse();