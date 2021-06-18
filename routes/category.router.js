const router = require('express').Router()
const { addCategory, getCategories, updateCategories } = require('../controllers/category.controller')
const { isSignin, isAdmin } = require('../middleware')

router.route('/category')
    .post(isSignin, isAdmin, addCategory)
    .get(getCategories)
router.post('/category/update', updateCategories)

module.exports = router