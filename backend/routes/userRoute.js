const express = require('express')
const {requireAuth, requireEditorOrAdmin} = require('../middleware/requireAuth')
const {
    getUser,
    loginUser,
    signupUser,
    getAllUsers
} = require('../controllers/userController')

const router = express.Router()

// @route Get /api/user/
// @desc Get user info
// @access Private
router.get('/', requireAuth, getUser)

// @route Get /api/user/all
// @desc Get All the users
// @access Public
router.get('/all', getAllUsers)

// @route POST api/user/login
// @desc Login User
// @access Public
router.post('/login', loginUser)

// @route POST /api/user/signup
// @desc Signup User
// @access Public
router.post('/signup', signupUser)
module.exports = router