if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const userRoutes = require("./routes/userRoutes");
const indexRoutes = require("./routes/index");
const { authentication } = require("./middlewares/authentication");
// const { authorization } = require('./middlewares/authorization')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", indexRoutes);

app.use(authentication);

app.use("/movies", movieRoutes);
app.use("/genre", genreRoutes);

app.use((err, req, res, next) => {
  let status = 500;
  let message = "Internal Servers Error";

  if (err.name === 'SequelizeValidationError') {
    const errors = error.errors[0].message;
    status = 400
    message = errors
  }else if (err.name === 'not found') {
    status = 404
    message = 'not found'
  }

  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`I LOP U ${port}`);
});
