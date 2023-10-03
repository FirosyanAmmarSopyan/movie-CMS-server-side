const express = require('express')
const app = express()
const port = 3000
const movieRoutes = require('./routes/movieRoutes')
const genreRoutes = require('./routes/genreRoutes')

app.use(express.urlencoded({extended : false})) 
app.use(express.json())

app.use('/movies' , movieRoutes)
app.use('/genre' , genreRoutes)

app.listen(port, () => {
  console.log(`I LOP U ${port}`)
})