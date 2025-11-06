const express = require('express');
const dotenv = require('dotenv');
const jobRoutes = require('./src/presentation/routes/JobRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');
const { initializeQueue } = require('./src/config/queue');
const logger = require('./src/utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize job queue
initializeQueue().then(() => {
  logger.info('Job queue initialized');
}).catch((error) => {
  logger.error('Failed to initialize job queue:', error);
});

// Routes
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;