const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth');

module.exports = verifyToken = (req, res, next) => {
    try {
        const { token } = req.body
        if(!token) throw new Error('Token is blank')
        req.tokenResult = jwt.verify(token, authConfig.secret)
        next()
    } catch (err) {
        res.json({error: err.message})
    }
}