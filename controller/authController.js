const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * Login User
 * 
 * @param req
 * @param res
 */
exports.authenticateUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {

        //validate if email exists
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        // compared password
        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) return res.status(400).json({ msg: 'Incorrect password' });

        //payload send to jwt
        const payload = {
            user: {
                id: user.id
            }
        };

        //create jwt
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600 // 1 hour
        }, (error, token) => {
            if (error) throw error;

            res.json({
                response: 'User logged successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token: token
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error has ocurred' });
    }

}
