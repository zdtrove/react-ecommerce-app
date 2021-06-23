const router = require('express').Router()
const { createProduct, getProductsBySlug, getProductDetailById } = require('../controllers/product.controller')
const { isSignin, isAdmin } = require('../middleware')

router.route('/product')
    .post(isSignin, isAdmin, createProduct)
router.get('/products/:slug', getProductsBySlug)
router.get('/product/:productId', getProductDetailById)

module.exports = router