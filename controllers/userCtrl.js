const User = require('../models/userModel')

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
        })
}