const Blog = require('../models/Blog');

const getYouTubeVideoId = (urlValue) => {
    if (!urlValue || typeof urlValue !== 'string') {
        return null;
    }

    try {
        const parsedUrl = new URL(urlValue);
        const host = parsedUrl.hostname.replace('www.', '');

        if (host === 'youtube.com' || host === 'm.youtube.com') {
            const videoId = parsedUrl.searchParams.get('v');
            return videoId && videoId.length === 11 ? videoId : null;
        }

        if (host === 'youtu.be') {
            const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
            return videoId && videoId.length === 11 ? videoId : null;
        }
    } catch (_error) {
        return null;
    }

    return null;
};

const getUploadedImageUrl = (req) => {
    if (!req.file) {
        return null;
    }

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}/uploads/${req.file.filename}`;
};

const getYouTubeThumbnail = (youtubeUrl) => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (!videoId) {
        return null;
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

// Create a new blog (User or Admin)
exports.createBlog = async (req, res) => {
    try {
        const { title, author, content, image, youtubeUrl, status } = req.body;
        // Users default to pending. Admin can pass 'approved' if we add that logic later, 
        // but for now, if 'status' is passed in body, accept it (secure via Admin panel logic) 
        // or force 'pending' for public API. 
        // Let's allow status to be set if passed, but typically frontend sends it.

        const normalizedImage = typeof image === 'string' ? image.trim() : '';
        const normalizedYouTubeUrl = typeof youtubeUrl === 'string' ? youtubeUrl.trim() : '';

        let finalImage = getUploadedImageUrl(req);
        if (!finalImage && normalizedImage) {
            finalImage = normalizedImage;
        }

        // If no photo is uploaded and image URL is empty, use YouTube thumbnail when possible.
        if (!finalImage && normalizedYouTubeUrl) {
            finalImage = getYouTubeThumbnail(normalizedYouTubeUrl);
        }

        const newBlog = new Blog({
            title,
            author,
            content,
            image: finalImage,
            youtubeUrl: normalizedYouTubeUrl,
            status: status || 'pending'
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing blog (Admin)
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const {
            title,
            content,
            image,
            youtubeUrl,
            author,
            status,
        } = req.body;

        if (typeof title === 'string') {
            blog.title = title;
        }

        if (typeof content === 'string') {
            blog.content = content;
        }

        if (typeof author === 'string') {
            blog.author = author;
        }

        if (typeof status === 'string') {
            blog.status = status;
        }

        const normalizedImage = typeof image === 'string' ? image.trim() : '';
        const normalizedYouTubeUrl = typeof youtubeUrl === 'string' ? youtubeUrl.trim() : '';

        if (typeof youtubeUrl === 'string') {
            blog.youtubeUrl = normalizedYouTubeUrl;
        }

        const uploadedImageUrl = getUploadedImageUrl(req);
        if (uploadedImageUrl) {
            blog.image = uploadedImageUrl;
        } else if (typeof image === 'string' && normalizedImage) {
            blog.image = normalizedImage;
        } else if (!blog.image && normalizedYouTubeUrl) {
            const thumbnail = getYouTubeThumbnail(normalizedYouTubeUrl);
            if (thumbnail) {
                blog.image = thumbnail;
            }
        }

        const updatedBlog = await blog.save();
        return res.json(updatedBlog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
