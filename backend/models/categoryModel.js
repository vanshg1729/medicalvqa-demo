const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image', // Reference to the Images schema
        },
    ],
    text: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema (creator)
        required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;