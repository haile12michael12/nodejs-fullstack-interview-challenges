const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { connectToBroker } = require('./broker');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'user-service' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, async () => {
  logger.info(`User service running on port ${PORT}`);
  
  // Connect to message broker
  try {
    await connectToBroker();
    logger.info('Connected to message broker');
  } catch (error) {
    logger.error('Failed to connect to message broker:', error);
  }
});