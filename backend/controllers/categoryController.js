const Category = require('../models/categoryModel')

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

module.exports = {
    getAllCatgories,
    createCategory,
    getCategoryByName
}