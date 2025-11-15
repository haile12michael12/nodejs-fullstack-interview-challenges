const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const router = express.Router();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Proxy requests to user service
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/api/users`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/api/users/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${USER_SERVICE_URL}/api/users/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${USER_SERVICE_URL}/api/users/${req.params.id}`);
    res.status(response.status).send();
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
});

module.exports = router;