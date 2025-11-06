const express = require('express');
const JobController = require('../controllers/JobController');

const router = express.Router();
const jobController = new JobController();

// Create a new job
router.post('/', jobController.createJob);

// Get a job by ID
router.get('/:id', jobController.getJobById);

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get jobs by status
router.get('/status/:status', jobController.getJobsByStatus);

module.exports = router;