const logger = require('../utils/logger');

// Mock email sending function
async function sendEmail(emailData) {
  // In a real application, this would integrate with an email service like SendGrid, SES, etc.
  logger.info('Sending email', emailData);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate potential failure
  if (Math.random() < 0.1) { // 10% failure rate
    throw new Error('Failed to send email');
  }
  
  logger.info(`Email sent successfully to ${emailData.email}`);
  return { success: true, messageId: `msg_${Date.now()}` };
}

module.exports = sendEmail;