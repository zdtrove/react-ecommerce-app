const { signup, signin, signout } = require('../../controllers/admin/auth.admin.controller')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth')
const router = require('express').Router()

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin)
router.post('/admin/signout', signout)

module.exports = router