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

// Add a pre middleware to delete a category and its corresponding images
categorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log('Inside pre-middleware for Category deleteOne')
    try {
      // Remove references in Image collection
      categoryId = this._id
      console.log('categoryId = ', categoryId)
      await mongoose.model('Image').deleteMany({ _id: { $in: this.images } });
  
      next();
    } catch (error) {
      console.error('Error in pre-middleware: ', error);
      next(error); // Pass the error to the next middleware/handler
    }
  });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;