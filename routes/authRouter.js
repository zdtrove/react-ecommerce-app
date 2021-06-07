const { signup, signin, requireSignin } = require('../controllers/authCtrl')

const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', signin)
// router.post('/profile', requireSignin, (req, res) => {
// 	res.status(200).json({ user: 'profile' })
// })

module.exports = router