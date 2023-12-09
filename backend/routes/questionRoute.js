// routes/questionRoute.jsimages of a tag

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    getAllQuestions, 
    getQuestionById,
    createQuestion
} = require('../controllers/questionController')

const router = express.Router()

// @route Get /api/question/
// @desc Get All questions
// @access Private
router.get('/', requireAuth, getAllQuestions)

// @route Get /api/question/:id
// @desc Get Question by it's ID
// @access Private
router.get('/:id', requireAuth, getQuestionById)

// @route Post /api/question/create
// @desc Create a question
// @access Private
router.post('/create', requireAuth, createQuestion)

module.exports = router