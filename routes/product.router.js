const router = require('express').Router()
const { createProduct, getProductsBySlug } = require('../controllers/product.controller')
const { isSignin, isAdmin } = require('../middleware')

router.route('/product')
    .post(isSignin, isAdmin, createProduct)
router.get('/product/:slug', getProductsBySlug)

module.exports = router