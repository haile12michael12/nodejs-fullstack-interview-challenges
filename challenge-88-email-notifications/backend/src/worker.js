const emailQueue = require('./queue');
const mailer = require('./mailer');
const db = require('./db');

// Process email jobs
emailQueue.process('send-email', async (job) => {
  const { emailData } = job.data;
  
  try {
    // Send the email
    const result = await mailer.sendEmail(emailData);
    
    // Update email status in database
    await db('emails')
      .where('id', emailData.id)
      .update({
        status: 'sent',
        sent_at: new Date()
      });
    
    return { status: 'sent', emailId: emailData.id, result };
  } catch (error) {
    // Update email status to failed
    await db('emails')
      .where('id', emailData.id)
      .update({
        status: 'failed',
        error_message: error.message
      });
    
    throw error;
  }
});

console.log('Email worker started...');