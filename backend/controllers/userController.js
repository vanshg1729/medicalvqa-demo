const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Category = require('../models/categoryModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '100d' })
}

// Controller function to get the list of all users
const getAllUsers = async (req, res) => {
    console.log("Inside getAllUsers function")
    try {
        // Fetch all users from the database
        const users = await User.find({}, '-password'); // Exclude the password field from the response

        // Send the list of users as a JSON response
        res.json(users);
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    console.log('Inside deleteUser controller')

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await user.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteAccount = async (req, res) => {
    const user = req.user
    try {
        // Check if the user making the request is authenticated
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        // Delete the authenticated user
        await user.deleteOne();

        // Remove references in Category collection
        await Category.updateMany({ user: userId }, { $unset: { user: 1 } });

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    loginUser,
    signupUser,
    getUser,
    getAllUsers,
    deleteUser,
    deleteAccount
}
