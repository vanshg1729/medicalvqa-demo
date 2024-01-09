// routes/questionRoute.jsimages of a tag

const express = require('express')
const {requireAuth, requireEditorOrAdmin} = require('../middleware/requireAuth')
const {
    getAllQuestions, 
    getQuestionById,
    createQuestion,
    deleteQuestionById,
    editQuestion
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
router.post('/create', requireAuth, requireEditorOrAdmin, createQuestion)

// @route DELETE /api/question/delete/:questionId
// @desc Delete a question along with it's references in Images and Users database
// @access Private
router.delete('/delete/:questionId', requireAuth, requireEditorOrAdmin, deleteQuestionById)

// @route PUT /api/question/edit/:questionId
// @desc Edits a question with new questionText and answerText
// @access Private
router.put('/edit/:questionId', requireAuth, requireEditorOrAdmin, editQuestion)

module.exports = router