// routes/imageRoute.jsimages of a tag

const express = require('express')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const path = require('path')
const {requireAuth, requireEditorOrAdmin} = require('../middleware/requireAuth')
const {
    getAllImages,
    getImageById,
    uploadImage,
    getImageTags,
    addTagToImage,
    addQuestionToImage,
    getImageQuestions,
    removeTagFromImage
} = require('../controllers/imageController')

const router = express.Router()

// Set up multer storage with diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
      const uniqueFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, uniqueFilename); // Specify the filename
    },
});
  
const upload = multer({storage: storage})

// @route Get /api/image/
// @desc Get All Images
// @access Private
router.get('/', requireAuth, getAllImages)

// @route Get /api/image/:id
// @desc Get Image by Id
// @access Private
router.get('/:id', requireAuth, getImageById)

// @route POST /api/image/upload
// @desc Create an Image
// @access Private
router.post('/upload', requireAuth, requireEditorOrAdmin, upload.single('image'), uploadImage)

// @route Get /api/image/:id/tags
// @desc Get all tags of an image
// @access Private
router.get('/:id/tags', requireAuth, getImageTags)

// @route Post /api/image/:id/addtag/:tagName
// @desc Adds a tag to an image
// @access Private
router.post('/:id/addtag/:tagName', requireAuth, requireEditorOrAdmin, addTagToImage)

// @route Post /api/image/:imageId/addquestion
// @desc Adds a question to an image
// @access Private
router.post('/:imageId/addquestion/', requireAuth, requireEditorOrAdmin, addQuestionToImage)

// @route GET /api/image/:imageId/questions
// @desc Gets all the questions of an image
// @access Private
router.get('/:imageId/questions', requireAuth, getImageQuestions)

// @route POST /api/image/:imageId/removeTag/:tagName
// @desc Removes a tag from an image given the tagName
// @access Private
router.delete('/:imageId/removeTag/:tagName', requireAuth, requireEditorOrAdmin, removeTagFromImage)

module.exports = router