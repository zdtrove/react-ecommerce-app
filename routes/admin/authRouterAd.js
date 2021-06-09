const { signup, signin } = require('../../controllers/admin/authCtrlAd')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth')
const router = require('express').Router()

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin)

module.exports = router