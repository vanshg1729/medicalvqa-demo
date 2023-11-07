const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '100d' })
} 

// @Status: Completed
// @params: {}
// @body: {}
const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

// @Status: Completed
// @params: {}
// @body: {}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password')
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// @Status: Completed
// @params: {}
// @body: {email, password}
const loginUser = async (req, res) => {
    console.log('Inside loginUser controller')
    const { email, password } = req.body

    try {
        const user = await User.login({ email, password })

        console.log('User = ', user)
        const token = createToken(user._id)
        const newUser = JSON.parse(JSON.stringify(user))
        newUser.password = undefined

        res.status(200).json({ ...newUser, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// @Status: Completed
// @params: {}
// @body: {email, password, fname, lname, age, contact}
const signupUser = async (req, res) => {
    console.log('Inside signupUser controller')

    const { email, password, fname, lname, age, contact } = req.body

    try {
        const user = await User.signup({
            email,
            password,
            fname,
            lname,
            age,
            contact,
        })

        const token = createToken(user._id)
        const newUser = JSON.parse(JSON.stringify(user))
        newUser.password = undefined

        res.status(200).json({ ...newUser, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
    getUser,
    getUsers
}