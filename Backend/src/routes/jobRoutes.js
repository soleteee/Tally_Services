const express = require('express');
const router = express.Router();
const {
    getJobs,
    getAllJobsAdmin,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobController');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Admin routes (In a real app, protect these with auth middleware)
router.get('/admin/all', getAllJobsAdmin);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
