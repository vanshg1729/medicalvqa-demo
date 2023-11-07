const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // Get Token from request header
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

module.exports = requireAuth