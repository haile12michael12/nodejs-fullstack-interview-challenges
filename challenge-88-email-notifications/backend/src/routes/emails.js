const express = require('express');
const router = express.Router();
const db = require('../db');
const emailQueue = require('../queue');
const { validateEmail } = require('../utils');

// Send an email
router.post('/send', async (req, res) => {
  try {
    const { templateId, recipient, subject, body } = req.body;
    
    // Validate input
    if (!recipient || !validateEmail(recipient)) {
      return res.status(400).json({ error: 'Valid recipient email is required' });
    }
    
    // Create email record in database
    const [emailId] = await db('emails').insert({
      template_id: templateId,
      recipient,
      subject,
      body,
      status: 'pending'
    });
    
    // Add email to queue for processing
    const emailData = {
      id: emailId,
      templateId,
      recipient,
      subject,
      body
    };
    
    await emailQueue.add('send-email', { emailData });
    
    res.status(200).json({ 
      message: 'Email queued for sending', 
      emailId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Get email status
router.get('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const email = await db('emails').where('id', id).first();
    
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }
    
    res.status(200).json(email);
  } catch (error) {
    console.error('Error getting email status:', error);
    res.status(500).json({ error: 'Failed to get email status' });
  }
});

// Get all emails
router.get('/', async (req, res) => {
  try {
    const emails = await db('emails').orderBy('created_at', 'desc');
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error getting emails:', error);
    res.status(500).json({ error: 'Failed to get emails' });
  }
});

module.exports = router;