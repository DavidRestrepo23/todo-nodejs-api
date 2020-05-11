const { check } = require('express-validator');

/**
 * Validate model user request
 */
const requestValidation = [
    check('name', 'The name field is required').notEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 8 })
];

module.exports = requestValidation;