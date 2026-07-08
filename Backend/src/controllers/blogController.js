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
            if (videoId && videoId.length === 11) {
                return videoId;
            }

            const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
            if (pathParts.length >= 2 && ['shorts', 'embed', 'live'].includes(pathParts[0])) {
                const pathVideoId = pathParts[1];
                return pathVideoId && pathVideoId.length === 11 ? pathVideoId : null;
            }

            return null;
        }

        if (host === 'youtu.be') {
            const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
            return videoId && videoId.length === 11 ? videoId : null;
        }

        if (host.endsWith('youtube-nocookie.com')) {
            const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
            if (pathParts.length >= 2 && pathParts[0] === 'embed') {
                const pathVideoId = pathParts[1];
                return pathVideoId && pathVideoId.length === 11 ? pathVideoId : null;
            }
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

        // If no photo is uploaded, prefer the YouTube thumbnail when a valid URL is present.
        if (!finalImage && normalizedYouTubeUrl) {
            finalImage = getYouTubeThumbnail(normalizedYouTubeUrl);
        }

        // Fall back to a manual image URL only when no upload or YouTube thumbnail is available.
        if (!finalImage && normalizedImage) {
            finalImage = normalizedImage;
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
        } else if (normalizedYouTubeUrl) {
            const thumbnail = getYouTubeThumbnail(normalizedYouTubeUrl);
            if (thumbnail) {
                blog.image = thumbnail;
            }
        } else if (typeof image === 'string' && normalizedImage) {
            blog.image = normalizedImage;
        }

        const updatedBlog = await blog.save();
        return res.json(updatedBlog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const defaultBlogs = [
    {
        _id: "default-1",
        title: "Modernizing Accounting Workflows with TallyIra",
        author: "Mittal Online Services",
        content: "Discover how TallyIra leverages AI to read business documents, automate invoice data extraction, and minimize manual errors in TallyPrime.",
        status: "approved",
        createdAt: new Date().toISOString()
    },
    {
        _id: "default-2",
        title: "TallyPrime 7.1 Release: What's New?",
        author: "Tally Solutions",
        content: "Explore the latest features of TallyPrime 7.1, including automated Schedule III compliance and integrated payment services.",
        status: "approved",
        createdAt: new Date().toISOString()
    },
    {
        _id: "default-3",
        title: "Why Data Privacy Matters in AI Accounting",
        author: "Security Desk",
        content: "How TallyIra protects sensitive business records with zero-sharing policies, keeping your financial information private.",
        status: "approved",
        createdAt: new Date().toISOString()
    }
];

// Get all approved blogs (Public)
exports.getPublicBlogs = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 1) {
            return res.json(defaultBlogs);
        }
        const blogs = await Blog.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(blogs.length > 0 ? blogs : defaultBlogs);
    } catch (error) {
        console.warn('[API] MongoDB query failed. Serving default blogs fallback:', error.message);
        res.json(defaultBlogs);
    }
};

// Get all blogs (Admin)
exports.getAllBlogs = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 1) {
            return res.json(defaultBlogs);
        }
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs.length > 0 ? blogs : defaultBlogs);
    } catch (error) {
        console.warn('[API] MongoDB admin query failed. Serving default blogs fallback:', error.message);
        res.json(defaultBlogs);
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
