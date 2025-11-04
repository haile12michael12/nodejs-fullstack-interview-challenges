const express = require('express');
const { createPost, getPosts } = require('../controllers/posts');

const router = express.Router();

// POST /posts - Create a new post
router.post('/', createPost);

// GET /posts - Get posts with author information
router.get('/', getPosts);

module.exports = router;