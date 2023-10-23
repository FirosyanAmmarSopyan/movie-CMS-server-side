const express = require('express')
const customerRoutes = express()
const CustomerController = require('../controllers/customerController')


customerRoutes.post('/register' , CustomerController.handlerRegisterClient)
customerRoutes.post('/login' , CustomerController.handlerLoginClient)
customerRoutes.post("/login-google", CustomerController.googleLogin);




module.exports = customerRoutes