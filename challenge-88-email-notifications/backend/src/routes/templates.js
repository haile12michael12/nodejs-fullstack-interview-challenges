const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new email template
router.post('/', async (req, res) => {
  try {
    const { name, subject, body } = req.body;
    
    // Validate input
    if (!name || !subject || !body) {
      return res.status(400).json({ error: 'Name, subject, and body are required' });
    }
    
    // Create template in database
    const [templateId] = await db('email_templates').insert({
      name,
      subject,
      body
    });
    
    const template = await db('email_templates').where('id', templateId).first();
    res.status(201).json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Get all email templates
router.get('/', async (req, res) => {
  try {
    const templates = await db('email_templates').orderBy('created_at', 'desc');
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error getting templates:', error);
    res.status(500).json({ error: 'Failed to get templates' });
  }
});

// Get a specific email template
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const template = await db('email_templates').where('id', id).first();
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    res.status(200).json(template);
  } catch (error) {
    console.error('Error getting template:', error);
    res.status(500).json({ error: 'Failed to get template' });
  }
});

// Update an email template
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subject, body } = req.body;
    
    // Validate input
    if (!name || !subject || !body) {
      return res.status(400).json({ error: 'Name, subject, and body are required' });
    }
    
    // Update template in database
    const updated = await db('email_templates')
      .where('id', id)
      .update({
        name,
        subject,
        body,
        updated_at: new Date()
      });
    
    if (!updated) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    const template = await db('email_templates').where('id', id).first();
    res.status(200).json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ error: 'Failed to update template' });
  }
});

// Delete an email template
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete template from database
    const deleted = await db('email_templates').where('id', id).del();
    
    if (!deleted) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

module.exports = router;