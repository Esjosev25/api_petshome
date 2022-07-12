const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
    }
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        console.log(decoded)
        req.user = decoded.user;
        console.log(req.user);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Token is not valid' });
    }

}