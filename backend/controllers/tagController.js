const Tag = require('../models/tagModel')
const Image = require('../models/imageModel')

// @Status: Completed
// @params: {}
// @body: {}
const getAllTags = async (req, res) => {
    const tags = await Tag.find({})
    res.status(200).json(tags)
}

// @Status: Completed
// @params: {}
// @body: {}
const createTag = async (req, res) => {
    const {name, images} = req.body;
    const user = req.user

    try {
      const newTag = new Tag({
        name,
        images,
      });
  
      const savedTag = await newTag.save();
  
      res.status(201).json(savedTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get a tag by name
// @Status: Completed
// @params: {name}
// @body: {}
const getTagByName = async (req, res) => {
  const tagName = req.params.name; // The name is in the URL parameter

  try {
    const tag = await Tag.findOne({ name: tagName });

    if (!tag) {
      return res.status(404).json({ message: 'tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get images by tag name
// @Status: Completed
// @params: {name}
// @body: {}
const getTagImages = async (req, res) => {
    const tagName = req.params.name; // The tag name is in the URL parameter
  
    try {
      // Find the tag by name
      const tag = await Tag.findOne({ name: tagName });
  
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      // Extract image IDs from the tag
      const imageIds = tag.images;
  
      if (!imageIds || imageIds.length === 0) {
        return res.status(404).json({ message: 'No images found for the specified tag' });
      }
  
      // Fetch images using the IDs
      const images = await Image.find({ _id: { $in: imageIds } }).select('path');
  
      res.json({ images });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
    getAllTags,
    createTag,
    getTagByName,
    getTagImages
}