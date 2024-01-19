const express = require('express')
const {requireAuth, requireEditorOrAdmin, requireAdmin} = require('../middleware/requireAuth')
const {
    getUser,
    loginUser,
    signupUser,
    getAllUsers,
    deleteUser,
    deleteAccount
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

// @route DELETE /api/user/delete/:id
// @desc Delete User
// @access Admins
router.delete('/delete/:userId', requireAuth, requireAdmin, deleteUser)

// @route DELETE /api/user/deleteAccount
// @desc Delete Account
// @access Private
router.delete('/deleteAccount', requireAuth, deleteAccount)

module.exports = router