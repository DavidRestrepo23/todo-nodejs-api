const jwt = require('jsonwebtoken');

/**
 * Middleware validate token
 * 
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: "Permission denied, security token does not exist" });

    try {

        const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenVerify.user; //add user_id to request

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Security token invalid" });
    }
}