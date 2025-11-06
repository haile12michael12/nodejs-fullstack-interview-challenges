const express = require('express');
const router = express.Router();
const versionController = require('../../controllers/versionController');

// Version 1 user routes
router.get('/', versionController.getUsersV1);
router.get('/:id', versionController.getUserByIdV1);
router.post('/', versionController.createUserV1);
router.put('/:id', versionController.updateUserV1);
router.delete('/:id', versionController.deleteUserV1);

module.exports = router;