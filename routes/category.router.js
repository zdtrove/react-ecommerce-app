const router = require('express').Router()
const { addCategory, getCategories } = require('../controllers/category.controller')
const { isSignin, isAdmin } = require('../middleware')

router.route('/category')
    .post(isSignin, isAdmin, addCategory)
    .get(getCategories)

module.exports = router