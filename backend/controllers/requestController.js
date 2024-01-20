const Request = require('../models/requestModel')
const User = require('../models/userModel')

// Controller function for sending a role request
const sendRoleRequest = async (req, res) => {
    console.log(`Inside sendRoleRequest`)
    try {
        const userId = req.user; // Assuming you have user information stored in req.user after authentication
        // Retrieve the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { description } = req.body;

        let roleRequested;

        // Set roleRequested based on the user's current role
        if (user.role === 'viewer') {
            roleRequested = 'editor';
        } else if (user.role === 'editor') {
            roleRequested = 'admin';
        } else {
            return res.status(400).json({ message: 'Invalid user role for role request' });
        }

        // Check if the user already has a pending request for the same role
        let existingRequest = await Request.findOne({ user: userId, roleRequested, status: 'pending' });
        if (existingRequest) {
            return res.status(400).json({ message: 'You already have a pending request for the same role' });
        }

        // Create a new role request
        const request = await Request.create({
            user: userId,
            roleRequested,
            description
        });

        res.json({ message: 'Role request sent successfully', request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to get all pending requests
const getAllPendingRequests = async (req, res) => {
    try {
        const pendingRequests = await Request.find({ status: 'pending' }).populate('user', 'email fname lname');

        res.json({ pendingRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function for accepting a role request
const acceptRoleRequest = async (req, res) => {
    const requestId = req.params.requestId;

    try {
        // Find the request by ID
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Update the user's role based on the request
        const user = await User.findByIdAndUpdate(request.user,
            { role: request.roleRequested },
            { new: true }
        );

        console.log(user)

        // Update the request status to 'approved'
        request.status = 'approved';
        await request.save();

        res.json({ message: 'Role request accepted successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function for rejecting a role request
const rejectRoleRequest = async (req, res) => {
    const requestId = req.params.requestId;

    try {
        // Find the request by ID
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Update the request status to 'rejected'
        request.status = 'rejected';
        await request.save();

        res.json({ message: 'Role request rejected successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    sendRoleRequest,
    getAllPendingRequests,
    acceptRoleRequest,
    rejectRoleRequest
}