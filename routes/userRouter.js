const { signup } = require('../controllers/userCtrl')

const router = require('express').Router()

router.post('/signup', signup)
router.post('/signin', (req, res) => {

})

module.exports = router