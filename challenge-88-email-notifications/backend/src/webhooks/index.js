const express = require('express');
const router = express.Router();
const db = require('../db');

// Webhook for email bounces
router.post('/bounce', async (req, res) => {
  try {
    const { emailId, reason } = req.body;
    
    // Update email status to bounced
    await db('emails')
      .where('id', emailId)
      .update({
        status: 'failed',
        error_message: `Bounced: ${reason}`
      });
    
    console.log(`Email ${emailId} bounced: ${reason}`);
    res.status(200).json({ message: 'Bounce recorded' });
  } catch (error) {
    console.error('Error processing bounce:', error);
    res.status(500).json({ error: 'Failed to process bounce' });
  }
});

// Webhook for spam complaints
router.post('/spam', async (req, res) => {
  try {
    const { emailId, reason } = req.body;
    
    // Update email status to spam
    await db('emails')
      .where('id', emailId)
      .update({
        status: 'failed',
        error_message: `Spam complaint: ${reason}`
      });
    
    console.log(`Email ${emailId} marked as spam: ${reason}`);
    res.status(200).json({ message: 'Spam complaint recorded' });
  } catch (error) {
    console.error('Error processing spam complaint:', error);
    res.status(500).json({ error: 'Failed to process spam complaint' });
  }
});

module.exports = router;