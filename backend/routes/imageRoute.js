// routes/tagRoute.js

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getAllImages,
    getImageById,
    createImage,
    getImageTags
} = require('../controllers/imageController')

const router = express.Router()

// @route Get /api/image/
// @desc Get All Images
// @access Private
router.get('/', requireAuth, getAllImages)

// @route Get /api/image/:id
// @desc Get Image by Id
// @access Private
router.get('/:id', requireAuth, getImageById)

// @route POST /api/tag/create
// @desc Create an Image
// @access Private
router.post('/create', requireAuth, createImage)

// @route Get /api/tag/:name/images/paths
// @desc Get all images of a tag
// @access Private
// router.get('/:name/images/paths', requireAuth, getTagImages)

module.exports = router