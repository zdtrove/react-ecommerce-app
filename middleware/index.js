const jwt = require('jsonwebtoken')

exports.isSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(user)
        req.user = user

    } else {
        return res.status(400).json({ msg: "Authorization required" })
    }
    next()
}

exports.isUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ msg: 'User access denied' })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ msg: 'Admin access denied' })
    }
    next()
}