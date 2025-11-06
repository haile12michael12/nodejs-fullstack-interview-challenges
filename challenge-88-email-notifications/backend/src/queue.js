const Queue = require('bull');
require('dotenv').config();

// Create a new queue for email processing
const emailQueue = new Queue('email processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  }
});

// Process email jobs
emailQueue.process('send-email', async (job) => {
  const { emailData } = job.data;
  console.log('Processing email:', emailData);
  
  // In a real implementation, this would send the email
  // For now, we'll just simulate the process
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { status: 'sent', emailId: emailData.id };
});

module.exports = emailQueue;