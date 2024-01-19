const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },

  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category schema
    },
  ],

  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag", // Reference to the Tags schema
    },
  ],

  path: {
    type: String,
    required: true,
  },

  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question", // Reference to the Questions schema
    },
  ],

  creationTime: {
    type: Date,
    default: Date.now, // Set the default creation time to the current date and time
  },
});

// Add a pre middleware to handle cleanup
imageSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  console.log('Inside pre-middleware for Image deleteOne')
  try {
    const imageId = this._id;
    console.log(`imageId = ${imageId}`)

    // Remove references in User collection
    await mongoose.model('User').updateMany({ images: imageId }, { $pull: { images: imageId } });

    // Remove references in Category collection
    await mongoose.model('Category').updateMany({ images: imageId }, { $pull: { images: imageId } });

    // Remove references in Tag collection
    await mongoose.model('Tag').updateMany({ images: imageId }, { $pull: { images: imageId } });

    // Delete associated questions
    await mongoose.model('Question').deleteMany({ image: imageId });

    next();
  } catch (error) {
    console.error('Error in pre-middleware: ', error);
    next(error); // Pass the error to the next middleware/handler
  }
});

// Add a pre middleware to handle cleanup for deleteMany
imageSchema.pre('deleteMany', { document: false, query: true }, async function (next) {
  console.log('Inside pre-middleware for Image deleteMany')
  try {
    const conditions = this.getQuery();

    if (conditions) {
      // Fetch images before deletion based on the conditions
      const images = await mongoose.model('Image').find(conditions);

      for (const image of images) {
        // Remove references in User collection
        await mongoose.model('User').updateMany({ images: image._id }, { $pull: { images: image._id } });

        // Remove references in Category collection
        await mongoose.model('Category').updateMany({ images: image._id }, { $pull: { images: image._id } });

        // Remove references in Tag collection
        await mongoose.model('Tag').updateMany({ images: image._id }, { $pull: { images: image._id } });

        // Delete associated questions
        await mongoose.model('Question').deleteMany({ image: image._id });
      }
    }

    next();
  } catch (error) {
    console.error('Error in Image deleteMany pre-middleware: ', error);
    next(error); // Pass the error to the next middleware/handler
  }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;