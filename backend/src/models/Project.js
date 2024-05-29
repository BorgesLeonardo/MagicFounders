const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    goal: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    daysLeft: {
        type: Number,
        required: true,
    },
    supported: {
        type: Number,
        default: 0,
    },
    supporters: {
        type: Number,
        default: 0,
    },
    progress: {
        type: Number,
        default: 0,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
