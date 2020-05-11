const express = require('express');
const router = express.Router();
const requestValidation = require('../requests/authRequest');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/auth');

/**
 * Login users
 * Use requestValidation
 * 
 * @model auth
 * @route /api/auth
 * @verbose POST
 * 
 */
router.post('/', requestValidation, authController.authenticateUser);


module.exports = router;