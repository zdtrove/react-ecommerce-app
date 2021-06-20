const router = require('express').Router()
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category.controller')
const { isSignin, isAdmin } = require('../middleware')

router.route('/category')
	.get(getCategories)
    .post(isSignin, isAdmin, addCategory)
    .patch(updateCategories)
    .delete(deleteCategories)

module.exports = router