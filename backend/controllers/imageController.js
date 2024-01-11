const Image = require('../models/imageModel')
const User = require('../models/userModel')
const Question = require('../models/questionModel')
const Tag = require('../models/tagModel')

const fs = require('fs');
const path = require('path');

// @Status: Completed
// @params: {}
// @body: {}
const getAllImages = async (req, res) => {
    try {
      console.log("Inside getAllImages function")
      const images = await Image.find();
      res.json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get an image by ID
// @Status: Completed
// @params: {id}
// @body: {}
const getImageById = async (req, res) => {
    const imageId = req.params.id; // The image ID is in the URL parameter
  
    try {
      const image = await Image.findById(imageId);
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.json(image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to create a new image
// @Status: Completed
// @params: {}
// @body: {categories, tags, path, questions}
const uploadImage = async (req, res) => {
    try {
      console.log("Inside uploadImage function")
      const {categories, tags, questions } = req.body;
      const user = req.user
      const newImage = new Image({
        user,
        categories,
        tags,
        path: '/uploads/' + req.file.filename, // This is the imageUrl
        questions,
      });
  
      const savedImage = await newImage.save();
  
      // Add the image ID to the user's images array
      await User.findByIdAndUpdate(user._id, { $push: { images: savedImage._id } });
  
      res.status(201).json(savedImage);
    } catch (error) {
      console.error(error);
      // Delete the uploaded image if an error occurs
      if (req.file) {
        const imagePath = path.join(__dirname, '../uploads', req.file.filename);
        console.log(`Deleted file: ${imagePath}`);
        fs.unlinkSync(imagePath);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get tags of an image by Image Id
// @Status: Completed
// @params: {id}
// @body: {}
const getImageTags = async (req, res) => {
  const imageId = req.params.id; // The image ID is in the URL parameter

  try {
    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Extract tag IDs from the image
    const tagIds = image.tags;

    if (!tagIds || tagIds.length === 0) {
      return res.json({ tags: [] }); // No tags associated with the image
    }

    // Fetch tag names using the IDs
    const tags = await Tag.find({ _id: { $in: tagIds } }).select('name');

    // Extract tag names from the fetched tags
    const tagNames = tags.map(tag => tag.name);

    res.json({ tags: tagNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to add a tag to an image by image ID
// @Status: Completed
// @params: {id, tagName}
// @body: {}
const addTagToImage = async (req, res) => {
  const imageId = req.params.id; // Assuming the image ID is in the URL parameter

  const tagName = req.params.tagName; // Assuming the tag name is in the URL parameter

  try {
    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Check if the tag already exists in the Tags database
    let tag = await Tag.findOne({ name: tagName });

    // If the tag doesn't exist, create a new tag
    if (!tag) {
      tag = new Tag({ name: tagName, images: [image._id] });
      await tag.save();
    } else {
      // Add the image to the tag's images array if not already present
      if (!tag.images.includes(image._id)) {
        tag.images.push(image._id);
        await tag.save();
      }
    }

    // Add the tag to the image's tags array if not already present
    if (!image.tags.includes(tag._id)) {
      image.tags.push(tag._id);
      await image.save();
    }

    res.json({ message: `Tag '${tagName}' added to the image successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to add a question to an image by image ID
// @Status: Completed
// @params: {imageId}
// @body: {questionText, answerText}
const addQuestionToImage = async (req, res) => {
  const imageId = req.params.imageId; // The image ID is in the URL parameter
  const { questionText, answerText } = req.body;
  const userId = req.user; // user information is available in req.user

  try {
    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Create a new question
    const newQuestion = new Question({
      questionText,
      answerText,
      user: userId, // Associate the question with the user
      image: imageId, // Associate the question with the image
    });

    // Save the new question to the Questions database
    const savedQuestion = await newQuestion.save();

    // Add the question to the image's questions array
    image.questions.push(savedQuestion._id);
    await image.save();

    // Add the question ID to the user's questions array
    await User.findByIdAndUpdate(userId, { $push: { questions: savedQuestion._id } });

    res.status(201).json({ message: 'Question added to the image successfully', question: savedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get all questions of an image by image ID
// @Status: Completed
// @params: {imageId}
// @body: {}
const getImageQuestions = async (req, res) => {
  const imageId = req.params.imageId; // The image ID is in the URL parameter
  console.log("Inside getImageQuestions function", imageId)
  try {
    // Find the image by ID
    const image = await Image.findById(imageId).populate('questions');

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Extracted questions with expanded details
    const expandedQuestions = image.questions.map(question => {
      // Assuming the questions have 'questionText' and 'answerText' properties
      const { questionText, answerText, status, _id } = question;
      return { questionText, answerText, status, questionId: _id };
    });

    console.log("expandedQuestions", expandedQuestions)

    res.json({ imageId: imageId, questions: expandedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to remove a tag from an image by image ID and tag name
const removeTagFromImage = async (req, res) => {
  const imageId = req.params.imageId;
  const tagName = req.params.tagName;

  try {
    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Find the tag by name
    const tag = await Tag.findOne({ name: tagName });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Check if the tag exists in the image's tags array
    const tagIndex = image.tags.findIndex(tagId => tagId.equals(tag._id));

    if (tagIndex === -1) {
      return res.status(404).json({ message: 'Tag not found in the image' });
    }

    // Remove the tag from the image's tags array
    image.tags.splice(tagIndex, 1);
    await image.save();

    // Remove the image ID from the particular tag in the Tags collection
    await Tag.updateOne({ name: tagName }, { $pull: { images: imageId } });

    res.json({ message: 'Tag removed from the image successfully', updatedImage: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
    getAllImages,
    getImageById,
    uploadImage,
    getImageTags,
    addTagToImage,
    addQuestionToImage,
    getImageQuestions,
    removeTagFromImage
}