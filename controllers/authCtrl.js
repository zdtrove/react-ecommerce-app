const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user) return res.status(400).json({
                msg: 'User already registered'
            })

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            })

            _user.save((err, data) => {
                if (err) return res.status(400).json({ msg: "Something went wrong" })
                if (data) return res.status(201).json({ msg: "User created success", user: data })
            })
        }
    )
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({ msg: "Something went wrong" })
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const accessToken = jwt.sign(
                        { _id: user._id }, 
                        process.env.ACCESS_TOKEN_SECRET, 
                        { expiresIn: '1h' }
                    )
                    const { _id, firstName, lastName, email, role, fullName } = user

                    res.status(200).json({
                        accessToken,
                        user: { _id, firstName, lastName, email, role, fullName }
                    })
                } else {
                    return res.status(400).json({
                        msg: "Invalid Password"
                    })
                }
            } else {
                return res.status(400).json({ msg: 'Something went wrong' })
            }
        }
    )
}

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log(user)
    req.user = user
    next()
}