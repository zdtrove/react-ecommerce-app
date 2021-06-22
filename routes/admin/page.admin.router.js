const router = require('express').Router()
const { createPage, getPage } = require('../../controllers/admin/page.admin.controller')
const { isSignin, isAdmin } = require('../../middleware')

router.post(`/page`, isSignin, isAdmin, createPage)
router.get(`/page/:category/:type`, getPage)

module.exports = router