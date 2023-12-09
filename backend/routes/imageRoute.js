// routes/imageRoute.jsimages of a tag

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getAllImages,
    getImageById,
    createImage,
    getImageTags,
    addTagToImage,
    addQuestionToImage,
    getImageQuestions
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

// @route POST /api/image/create
// @desc Create an Image
// @access Private
router.post('/create', requireAuth, createImage)

// @route Get /api/image/:id/tags
// @desc Get all tags of an image
// @access Private
router.get('/:id/tags', requireAuth, getImageTags)

// @route Post /api/image/:id/addtag/:tagName
// @desc Adds a tag to an image
// @access Private
router.post('/:id/addtag/:tagName', requireAuth, addTagToImage)

// @route Post /api/image/:imageId/addquestion
// @desc Adds a question to an image
// @access Private
router.post('/:imageId/addquestion/', requireAuth, addQuestionToImage)

// @route GET /api/image/:imageId/questions
// @desc Gets all the questions of an image
// @access Private
router.get('/:imageId/questions', requireAuth, getImageQuestions)

module.exports = router