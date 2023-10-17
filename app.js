if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const historyRoutes = require('./routes/history');
const indexRoutes = require("./routes/index");
const customerRoutes = require('./routes/customerRoutes');
const customerPageRoutes = require('./routes/customerPageRoutes')
const { authentication } = require("./middlewares/authentication");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRoutes);
app.use("/customer", customerRoutes)

app.use('/cust-pages' , customerPageRoutes)
app.use(authentication);
app.use('/history' , historyRoutes)
app.use("/movies", movieRoutes);
app.use("/genre", genreRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal Servers Error";

  if (err.name === 'SequelizeValidationError') {
    const errors = error.errors[0].message;
    status = 400
    message = errors
  }else if (err.name === 'not found') {
    status = 404
    message = 'not found'
  } else if (err.name === "error invalid email or password") {
    status = 401
    message = "error invalid email or password"
  }else if (err.name === 'cant edit with same status') {
    status = 400
    message = 'cant edit with same status'
  }

  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`I LOP U ${port}`);
});
