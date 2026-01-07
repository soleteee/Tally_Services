const Blog = require('../models/Blog');

// Create a new blog (User or Admin)
exports.createBlog = async (req, res) => {
    try {
        const { title, author, content, image, status } = req.body;
        // Users default to pending. Admin can pass 'approved' if we add that logic later, 
        // but for now, if 'status' is passed in body, accept it (secure via Admin panel logic) 
        // or force 'pending' for public API. 
        // Let's allow status to be set if passed, but typically frontend sends it.

        const newBlog = new Blog({
            title,
            author,
            content,
            image,
            status: status || 'pending'
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all approved blogs (Public)
exports.getPublicBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all blogs (Admin)
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a blog
exports.approveBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
