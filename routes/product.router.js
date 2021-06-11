const router = require('express').Router()
const { createProduct } = require('../controllers/product.controller')
const { isSignin, isAdmin } = require('../middleware')

router.route('/product')
    .post(isSignin, isAdmin, createProduct)

module.exports = router