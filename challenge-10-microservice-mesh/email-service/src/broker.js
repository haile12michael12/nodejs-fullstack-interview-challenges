const amqp = require('amqp-connection-manager');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const { USER_EVENTS_EXCHANGE } = require('../../shared/constants/exchanges');
const { USER_CREATED_QUEUE } = require('../../shared/constants/queues');
const sendEmail = require('./handlers/sendEmail');

// Load environment variables
dotenv.config();

async function connectToBroker() {
  const connection = amqp.connect([process.env.RABBITMQ_URL]);
  
  connection.on('connect', () => {
    logger.info('Connected to RabbitMQ');
  });
  
  connection.on('disconnect', (err) => {
    logger.error('Disconnected from RabbitMQ', err);
  });
  
  const channelWrapper = connection.createChannel({
    json: true,
    setup: async (channel) => {
      // Create queue for user created events
      await channel.assertQueue(USER_CREATED_QUEUE, { durable: true });
      
      // Bind queue to exchange
      await channel.bindQueue(USER_CREATED_QUEUE, USER_EVENTS_EXCHANGE, 'user.created');
      
      // Consume messages
      await channel.consume(USER_CREATED_QUEUE, async (msg) => {
        if (msg) {
          try {
            const user = JSON.parse(msg.content.toString());
            logger.info('Received user created event', user);
            
            // Send welcome email
            await sendEmail({
              userId: user.id,
              email: user.email,
              subject: 'Welcome to our platform!',
              body: `Hi ${user.name}, welcome to our platform!`,
              sentAt: new Date().toISOString()
            });
            
            // Acknowledge message
            channel.ack(msg);
          } catch (error) {
            logger.error('Failed to process user created event', error);
            // Reject message and requeue
            channel.nack(msg, false, true);
          }
        }
      });
    }
  });
  
  return connection;
}

module.exports = {
  connectToBroker
};