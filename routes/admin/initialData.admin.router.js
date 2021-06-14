const { initialData } = require('../../controllers/admin/initialData.admin.controller')

const router = require('express').Router()

router.post('/admin/initialdata', initialData)

module.exports = router