const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image', // Reference to the Images schema
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    answerText: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (creator)
        required: true,
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ["submitted", "approved"],
        default: "submitted"
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (approving admin)
    },
    creationTime: {
        type: Date,
        default: Date.now, // Set the default creation time to the current date and time
    },
    approvalTime: {
        type: Date,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;