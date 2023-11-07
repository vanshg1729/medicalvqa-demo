const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
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
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = Tags;