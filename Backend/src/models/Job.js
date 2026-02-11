const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    experience: { type: String, required: true },
    salaryRange: { type: String },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
