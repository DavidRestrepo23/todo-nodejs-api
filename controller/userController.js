const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

/**
 * Save user in database collection
 * @param req
 * @param res
 * @return response | json
 */
exports.create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'This email already exists' });

        user = new User(req.body);

        //hash password
        const salt = await bcryptjs.genSalt(5);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();
        res.json({ msg: 'User create successful' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error has ocurred' });
    }
}


/**
 * Get User Authenticated
 * 
 * @param req
 * @param res
 */

exports.getUserAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error has ocurred' });
    }
}