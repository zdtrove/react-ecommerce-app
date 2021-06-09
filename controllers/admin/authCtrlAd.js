const User = require('../../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user) return res.status(400).json({
                msg: 'Admin already registered'
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
                username: Math.random().toString(),
                role: 'admin'
            })

            _user.save((err, data) => {
                if (err) return res.status(400).json({ msg: "Something went wrong" })
                if (data) return res.status(201).json({ msg: "Admin created successfully", user: data })
            })
        }
        )
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({ msg: "Something went wrong" })
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
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
                return res.status(400).json({ msg: 'Something went wrong' })
            }
        })
}