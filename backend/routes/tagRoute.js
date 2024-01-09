// routes/tagRoute.js

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getAllTags,
    getTagByName,
    createTag,
    getTagImages,
    deleteTagByName
} = require('../controllers/tagController')

const router = express.Router()

// @route Get /api/tag/
// @desc Get All Tags
// @access Private
router.get('/', requireAuth, getAllTags)

// @route Get /api/tag/:name
// @desc Get Tag by name
// @access Private
router.get('/:name', requireAuth, getTagByName)

// @route POST /api/tag/create
// @desc Create a Tag
// @access Private
router.post('/create', requireAuth, createTag)

// @route Get /api/tag/:name/images/paths
// @desc Get all images of a tag
// @access Private
router.get('/:name/images/paths', requireAuth, getTagImages)

// @route Delete /api/tag/delete/:tagName
// @desc Delete the tag from the database with all it's references
// @access Private
router.delete('/delete/:tagName', requireAuth, deleteTagByName)

module.exports = router