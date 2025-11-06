const express = require('express');
const router = express.Router();
const versionController = require('../../controllers/versionController');

// Version 2 user routes with enhanced functionality
router.get('/', versionController.getUsersV2);
router.get('/:id', versionController.getUserByIdV2);
router.post('/', versionController.createUserV2);
router.put('/:id', versionController.updateUserV2);
router.delete('/:id', versionController.deleteUserV2);
router.patch('/:id/activate', versionController.activateUserV2);

module.exports = router;