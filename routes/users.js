const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const requestValidation = require('../requests/userRequest');
const authMiddleware = require('../middleware/auth');

/**
 * Create users
 * Use requestValidation
 * 
 * @model users
 * @route /api/users
 */
router.post('/', requestValidation, userController.create);

/**
 * Get User Authenticated
 * 
 * @model auth
 * @route /api/users
 * @verbose GET
 * 
 */
router.get('/', authMiddleware, userController.getUserAuthenticated)

module.exports = router;