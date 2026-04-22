const mongoose = require('mongoose');

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const seoSchema = new mongoose.Schema(
    {
        pageKey: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [slugPattern, 'pageKey must be a lowercase hyphenated key'],
        },
        pageName: {
            type: String,
            required: true,
            trim: true,
        },
        routePath: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [70, 'Title cannot exceed 70 characters'],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [170, 'Description cannot exceed 170 characters'],
        },
        keywords: {
            type: [String],
            default: [],
        },
        headTags: {
            type: [String],
            default: [],
        },
        schemaJson: {
            type: String,
            trim: true,
            default: '',
        },
        updatedBy: {
            type: String,
            trim: true,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Seo', seoSchema);
