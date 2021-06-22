const { initialData } = require('../../controllers/admin/initialData.admin.controller')
const { isSignin, isAdmin } = require('../../middleware')
const router = require('express').Router()

router.post('/admin/initialdata', isSignin, isAdmin, initialData)

module.exports = router