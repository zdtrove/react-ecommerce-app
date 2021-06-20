const router = require('express').Router()
const { createPage } = require('../../controllers/admin/page.admin.controller')

router.post(`/page`, createPage)

module.exports = router