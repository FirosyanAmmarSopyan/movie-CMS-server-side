const express = require('express')
const customerPageRoutes = express()
const CustomerController = require('../controllers/customerController')
const { custAuthentication } = require('../middlewares/custAuthentication')
const MovieController = require('../controllers/movie')


customerPageRoutes.get('/movies' , CustomerController.readAllMovies),
customerPageRoutes.get('/movies/:id' , MovieController.renderDetail )
customerPageRoutes.get('/genres' , CustomerController.renderGenre)
// customerPageRoutes.use(custAuthentication)
customerPageRoutes.get('/favorites' , CustomerController.readAllFavorite)
customerPageRoutes.post('/favorites/:movieId' , CustomerController.handleFavorites )



module.exports = customerPageRoutes