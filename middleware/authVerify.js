const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "Autherization Denied" });
    }

    try {
        const jwtSecret = config.tokenSecret;
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Invalid Token!" });
    }

}