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

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;