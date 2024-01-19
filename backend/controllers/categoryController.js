const Category = require('../models/categoryModel')
const Image = require('../models/imageModel')
const Tag = require('../models/tagModel')
const Question = require('../models/questionModel')

// @Status: Completed
// @params: {}
// @body: {}
const getAllCatgories = async (req, res) => {
    const categories = await Category.find({})
    res.status(200).json(categories)
}

// @Status: Completed
// @params: {}
// @body: {}
const createCategory = async (req, res) => {
    const { name, images, text} = req.body;
    const user = req.user

    try {
      const newCategory = new Category({
        name,
        images,
        text,
        user,
      });
  
      const savedCategory = await newCategory.save();
  
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get a category by name
// @Status: Completed
// @params: {name}
// @body: {}
const getCategoryByName = async (req, res) => {
  const categoryName = req.params.name; // The name is in the URL parameter

  try {
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get images of a category by category ID
// @Status: Completed
// @params: {id}
// @body: {}
const getCategoryImages = async (req, res) => {
  const categoryId = req.params.id; // Assuming the category ID is in the URL parameter

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find images of the category
    const images = await Image.find({ categories: category._id });

    if (!images || images.length === 0) {
      return res.json({ images: [] }); // No images found for the category
    }

    // Extract image paths, corresponding tag names, and questions
    const result = images.map(async (image) => {
      // Fetch tag names using the image's tag IDs
      const tagNames = await Tag.find({ _id: { $in: image.tags } }).select('name');

      // Fetch questions using the image's question IDs
      const questions = await Question.find({ _id: { $in: image.questions } }).select('questionText answerText');

      return {
        id: image._id,
        path: image.path,
        tags: tagNames.map(tag => tag.name),
        questions: questions,
      };
    });

    // Wait for all promises to resolve
    const finalResult = await Promise.all(result);

    res.json({ images: finalResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Controller function to add an image to a category by image ID and category ID
// @Status: Completed
// @params: {categoryId, imageId}
// @body: {}
const addImageToCategory = async (req, res) => {
  const imageId = req.params.imageId; // The image ID is in the URL parameter
  const categoryId = req.params.categoryId; // The category ID is in the URL parameter

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Add the category to the image's categories array if not already present
    if (!image.categories.includes(category._id)) {
      image.categories.push(category._id);
      await image.save();
    }

    // Add the image to the category's images array if not already present
    if (!category.images.includes(image._id)) {
      category.images.push(image._id);
      await category.save();
    }

    res.json({ message: 'Image added to the category successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete a category by ID
const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Remove the category from the Categories database
    await category.deleteOne();

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
    getAllCatgories,
    createCategory,
    getCategoryByName,
    getCategoryImages,
    addImageToCategory,
    deleteCategoryById
}