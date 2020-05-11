const { check } = require('express-validator');

/**
 * Validate model auth request
 */

const requestValidation = [
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 })
];

module.exports = requestValidation;