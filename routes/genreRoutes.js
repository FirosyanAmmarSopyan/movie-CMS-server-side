const express = require('express')
const genreRoutes = express()
const GenreController = require('../controllers/genre')


genreRoutes.get('/' , GenreController.renderGenre)


module.exports  = genreRoutes