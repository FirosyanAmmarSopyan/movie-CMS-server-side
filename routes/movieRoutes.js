const express = require('express')
const movieRoutes = express()
const MovieController  = require('../controllers/movie')

movieRoutes.post('/' , MovieController.handlerCreate)
movieRoutes.get('/' , MovieController.readAll)
movieRoutes.get('/:id' , MovieController.renderDetail)
movieRoutes.delete('/:id' , MovieController.handlerDelete)


module.exports = movieRoutes