const { check } = require('express-validator');

/**
* Validate model project request
*/

const requestValidation = [
    check('name', 'The name project field is required').notEmpty(),
];

module.exports = requestValidation;