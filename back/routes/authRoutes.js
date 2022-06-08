const express = require('express')
const router = express.Router()
const {login, register, confirmEmail} = require('../controllers/auth')

router.post('/login', login)

router.post('/register', register)

router.post('/confirmation', confirmEmail)

module.exports = router