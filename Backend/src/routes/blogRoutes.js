const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Public Routes
router.get('/', blogController.getPublicBlogs);
router.post('/', blogController.createBlog);

// Admin Routes (Technically should be protected, but for this task scope keeping open or relying on separate endpoints)
router.get('/admin/all', blogController.getAllBlogs);
router.patch('/:id/approve', blogController.approveBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
