const mongoose = require('mongoose');

const crochetProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
        },
        category: {
            type: String,
            default: 'General',
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Product image is required'],
            trim: true,
        },
        additionalImages: {
            type: [String],
            default: [],
        },
        materials: {
            type: String,
            default: 'Premium Soft Yarn',
            trim: true,
        },
        dimensions: {
            type: String,
            default: '',
            trim: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        isCustomizable: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Note: No price field is included as pricing is strictly by custom WhatsApp inquiry/quotation.

module.exports = mongoose.model('CrochetProduct', crochetProductSchema);

