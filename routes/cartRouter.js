const router = require('express').Router()
const { addItemToCart } = require('../controllers/cartCtrl')
const { isSignin, isUser } = require('../middleware')

router.route('/cart')
    .post(isSignin, isUser, addItemToCart)

module.exports = router