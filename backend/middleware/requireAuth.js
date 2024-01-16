const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // Get Token from request header
    console.log("Inside requireAuth")
    const { authorization } = req.headers

    // Check if Token is not present
    if (!authorization) {
        return res.status(401).json({error: 'Authorization Token Required'})
    }

    const token = authorization.split(' ')[1]

    // Verify the Token
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        
        next()
    } catch (error) {
       console.log('requireAuth error: ', error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

// Middleware function to check if the user is an editor or admin
const requireEditorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id); // Assuming you are using passport for authentication and req.user is available
        if (!user || (user.role !== 'editor' && user.role !== 'admin')) {
            return res.status(403).json({ message: 'Access forbidden. You need to be an editor or admin.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    requireAuth,
    requireEditorOrAdmin
}
