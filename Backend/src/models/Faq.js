const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
    {
        pageKey: {
            type: String,
            required: true,
            enum: ['about', 'products'],
            trim: true,
            lowercase: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        sortOrder: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        updatedBy: {
            type: String,
            trim: true,
            default: '',
        },
    },
    { timestamps: true }
);

faqSchema.index({ pageKey: 1, sortOrder: 1, createdAt: 1 });

module.exports = mongoose.model('Faq', faqSchema);