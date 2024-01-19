// routes/categoryRoute.js

const express = require('express')
const {requireAuth, requireEditorOrAdmin} = require('../middleware/requireAuth')
const {
    getAllCatgories,
    createCategory,
    getCategoryByName,
    getCategoryImages,
    addImageToCategory,
    deleteCategoryById
} = require('../controllers/categoryController')

const router = express.Router()

// @route Get /api/category/
// @desc Get All Categories
// @access Private
router.get('/', requireAuth, getAllCatgories)

// @route Get /api/category/:name
// @desc Get Category by name
// @access Private
router.get('/:name', requireAuth, getCategoryByName)

// @route POST /api/category/create
// @desc Create a category
// @access Private
router.post('/create', requireAuth, requireEditorOrAdmin, createCategory)

// @route GET /api/category/:id/images
// @desc Get all images along with tagNames of a category
// @access Private
router.get('/:id/images', requireAuth, getCategoryImages)

// @route Post /api/cateogory/:categoryId/addimage/:imageId
// @desc Add an image to a category
// @access Private
router.post('/:categoryId/addimage/:imageId', requireAuth, requireEditorOrAdmin, addImageToCategory)

// @route Delete /api/category/delete/:categoryId
// @desc Deletes a category by ID
// @access Admin or Editor
router.delete('/delete/:categoryId', requireAuth, requireEditorOrAdmin, deleteCategoryById)

module.exports = router