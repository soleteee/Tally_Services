const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to image
        required: false,
    },
    socialUrl: {
        type: String,
        required: false,
        trim: true,
    },
    // Kept for compatibility with blogs created before socialUrl was introduced.
    youtubeUrl: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Blog', blogSchema);
