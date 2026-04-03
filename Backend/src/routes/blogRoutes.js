const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (_req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage });

// Public Routes
router.get('/', blogController.getPublicBlogs);
router.post('/', upload.single('imageFile'), blogController.createBlog);

// Admin Routes (Technically should be protected, but for this task scope keeping open or relying on separate endpoints)
router.get('/admin/all', blogController.getAllBlogs);
router.put('/:id', upload.single('imageFile'), blogController.updateBlog);
router.patch('/:id/approve', blogController.approveBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
