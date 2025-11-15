const amqp = require('amqp-connection-manager');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const { USER_EVENTS_EXCHANGE } = require('../../shared/constants/exchanges');

// Load environment variables
dotenv.config();

let channelWrapper;

async function connectToBroker() {
  const connection = amqp.connect([process.env.RABBITMQ_URL]);
  
  connection.on('connect', () => {
    logger.info('Connected to RabbitMQ');
  });
  
  connection.on('disconnect', (err) => {
    logger.error('Disconnected from RabbitMQ', err);
  });
  
  channelWrapper = connection.createChannel({
    json: true,
    setup: async (channel) => {
      // Create exchange for user events
      await channel.assertExchange(USER_EVENTS_EXCHANGE, 'topic', { durable: true });
    }
  });
  
  return connection;
}

async function publishUserEvent(eventType, payload) {
  if (!channelWrapper) {
    throw new Error('Broker not connected');
  }
  
  try {
    await channelWrapper.sendToQueue(`user.${eventType}`, payload);
    logger.info(`Published user event: ${eventType}`, payload);
  } catch (error) {
    logger.error(`Failed to publish user event: ${eventType}`, error);
    throw error;
  }
}

module.exports = {
  connectToBroker,
  publishUserEvent
};