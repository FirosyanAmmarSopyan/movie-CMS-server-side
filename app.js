const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const movieRoutes = require('./routes/movieRoutes')
const genreRoutes = require('./routes/genreRoutes')
const userRoutes = require('./routes/userRoutes')
const indexRoutes = require('./routes/index')


app.use(cors())
app.use(express.urlencoded({extended : false})) 
app.use(express.json())

app.use('/' , indexRoutes)


app.use('/movies' , movieRoutes)
app.use('/genre' , genreRoutes)

app.listen(port, () => {
  console.log(`I LOP U ${port}`)
})