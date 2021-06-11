const { signup, signin } = require('../controllers/auth.controller')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth')

const router = require('express').Router()

router.post('/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/signin', validateSigninRequest, isRequestValidated, signin)

module.exports = router