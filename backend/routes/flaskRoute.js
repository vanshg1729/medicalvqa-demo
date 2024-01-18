// routes/flaskRoute.js

const express = require('express')
const {requireAuth, requireEditorOrAdmin} = require('../middleware/requireAuth')

const {
    getSimilarTags,
    getClosestQuestion
} = require('../controllers/flaskController')

const router = express.Router()

// @route Get /api/flask/get_tags
// @desc Get similar tags to the ones provided
// @access Private
router.get('/get_tags', requireAuth, getSimilarTags)

// @route Get /api/flask/get_question
// @desc Get the closest question to the one provided
// @access Private
router.get('/get_question', requireAuth, getClosestQuestion)

module.exports = router