const express = require('express')
const {requireAuth, requireEditorOrAdmin, requireAdmin} = require('../middleware/requireAuth')

const {
    sendRoleRequest,
    getAllPendingRequests,
    acceptRoleRequest,
    rejectRoleRequest
} = require('../controllers/requestController')

const router = express.Router()

// @route POST /api/request/role
// @desc Send a role request
// @access Private
router.post('/role', requireAuth, sendRoleRequest)

// @route GET /api/request/pending
// @descd Get all pending requests
// @access Adming
router.get('/pending', requireAuth, requireAdmin, getAllPendingRequests)

// @router POST /api/request/accept
// @desc Accept a role request
// @access Admin
router.post('/accept/:requestId', requireAuth, requireAdmin, acceptRoleRequest)

// @router POST /api/request/reject
// @desc Reject a role request
// @access Admin
router.post('/reject/:requestId', requireAuth, requireAdmin, rejectRoleRequest)

module.exports = router