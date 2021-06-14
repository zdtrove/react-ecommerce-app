const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (err, user) => {
            if (user) return res.status(400).json({
                msg: 'User already registered'
            })

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body

            const hash_password = await bcrypt.hash(password, 10)

            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: Math.random().toString()
            })

            _user.save((err, data) => {
                if (err) return res.status(400).json({ err })
                if (data) return res.status(201).json({ msg: "User created success", user: data })
            })
        }
        )
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({ err })
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const accessToken = jwt.sign(
                        { _id: user._id, role: user.role },
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
                return res.status(400).json({ msg: "User not found" })
            }
        })
}