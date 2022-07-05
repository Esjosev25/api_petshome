const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Token is not valid' });
    }

}