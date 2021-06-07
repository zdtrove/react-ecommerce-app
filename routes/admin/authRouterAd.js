const { signup, signin, requireSignin } = require('../../controllers/admin/authCtrlAd')

const router = require('express').Router()

router.post('/admin/signup', signup)
router.post('/admin/signin', signin)

module.exports = router