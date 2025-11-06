const express = require('express');
const router = express.Router();
const v1UsersRouter = require('./v1/users');
const v2UsersRouter = require('./v2/users');
const versioningMiddleware = require('../middleware/versioning');

// Apply versioning middleware
router.use(versioningMiddleware);

// Version 1 routes
router.use('/v1/users', v1UsersRouter);

// Version 2 routes
router.use('/v2/users', v2UsersRouter);

// Default to v1 if no version specified
router.use('/users', v1UsersRouter);

module.exports = router;