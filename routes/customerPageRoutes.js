const express = require('express')
const customerPageRoutes = express()
const CustomerController = require('../controllers/customerController')
const { custAuthentication } = require('../middlewares/custAuthentication')


customerPageRoutes.use(custAuthentication)
customerPageRoutes.get('/movies' , CustomerController.readAllMovies)
customerPageRoutes.get('/genres' , CustomerController.renderGenre)



module.exports = customerPageRoutes