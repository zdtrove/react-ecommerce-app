const router = require('express').Router()
const { addItemToCart } = require('../controllers/cart.controller')
const { isSignin, isUser } = require('../middleware')

router.route('/cart')
    .post(isSignin, isUser, addItemToCart)

module.exports = router