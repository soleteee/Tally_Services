const mongoose = require('mongoose');

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const seoSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [slugPattern, 'Page must be a lowercase hyphenated slug'],
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [60, 'Title cannot exceed 60 characters'],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [160, 'Description cannot exceed 160 characters'],
        },
        keywords: {
            type: String,
            trim: true,
            default: '',
        },
        headTags: {
            type: String,
            trim: true,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Seo', seoSchema);
