const Image = require('../models/imageModel')

// @Status: Completed
// @params: {}
// @body: {}
const getAllImages = async (req, res) => {
    try {
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
exports.createImage = async (req, res) => {
    const {categories, tags, path, questions } = req.body;
    const user = req.user
  
    try {
      const newImage = new Image({
        user,
        categories,
        tags,
        path,
        questions,
      });
  
      const savedImage = await newImage.save();
  
      res.status(201).json(savedImage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllImages,
    getImageById
}