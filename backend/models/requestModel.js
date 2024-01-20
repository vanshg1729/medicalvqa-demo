const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User Schema
        required: true
    },

    roleRequested: {
        type: String,
        required: true,
        enum: ['editor', 'admin']
    },

    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    },

    description: {
        type: String,
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request