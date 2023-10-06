const express = require('express')
const movieRoutes = express.Router()
const MovieController  = require('../controllers/movie')
const { authorization } = require('../middlewares/authorization')

movieRoutes.post('/' , MovieController.handlerCreate)
movieRoutes.get('/' , MovieController.readAll)
movieRoutes.get('/:id' , MovieController.renderDetail)
movieRoutes.delete('/:id' , authorization , MovieController.handlerDelete)


module.exports = movieRoutes