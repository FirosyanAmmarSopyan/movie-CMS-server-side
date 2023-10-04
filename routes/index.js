const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register' , UserController.handlerRegister)
router.post('/login' , UserController.handlerLogin)

module.exports = router