const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        default: ''
    },
    isVisible: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Poster', posterSchema);
