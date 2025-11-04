const express = require('express');
const { createUser, getUserById } = require('../controllers/users');

const router = express.Router();

// POST /users - Create a new user
router.post('/', createUser);

// GET /users/:id - Get user with related data
router.get('/:id', getUserById);

module.exports = router;