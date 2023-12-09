// routes/categoryRoute.js

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getAllCatgories,
    createCategory,
    getCategoryByName
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
router.post('/create', requireAuth, createCategory)

module.exports = router