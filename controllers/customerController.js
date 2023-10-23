const { Customer, Genre, Movie, User, Favorite } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const { Op } = require("sequelize");

class CustomerController {
  static async handlerLoginClient(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Customer.findOne({ where: { email } });

      if (!user) {
        throw { name: "error invalid email or password" };
      } else {
        let validPw = bcrypt.compareSync(password, user.password);
        if (validPw) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          //   console.log( payload , '<<<<<<');

          const access_token = jwt.sign(payload, process.env.SECRET_KEY_JWT);

          res.status(200).json({
            access_token,
          });
        } else {
          throw { name: "error invalid email or password" };
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async handlerRegisterClient(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "email required" };
      }
      if (!password) {
        throw { name: "password required" };
      }
      const user = await Customer.create({
        email,
        password,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      //1. copas gugel buat tiket
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience:
          "1054147652656-c0q5svgpmjlbkhe32gs25piken3s2upo.apps.googleusercontent.com",
      });
      //2.buat ambil payload
      const payload = ticket.getPayload();
      // console.log(payload, "<<<<<<<<");
      //3. find or create data to db
      const [user, created] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "34827",
          role: "client",
        },
      });
      //4. create token
      console.log(process.env.SECRET_KEY_JWT, "<<<<<<< di gugel login");
      const access_token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY_JWT
      );
      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async renderGenre(req, res, next) {
    try {
      const genre = await Genre.findAll();
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }
  static async readAllMovies(req, res, next) {
    try {
      const { limit = 8, filter, page } = req.query;
      
      let options = {
        limit,
        include: [Genre, User],
      };

      if (page) {
          options.offset = (page * limit - limit) 
      }


      if (filter) {
        options.where = {
          genreId: filter,
          status: "active",
        };
      }

      const movie = await Movie.findAll(options);

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async readAllFavorite(req, res, next) {
    try {
      const favMovie = await Favorite.findAll({
        include: [Movie],
        where: { customerId: req.customer.id },
      });
      console.log(req.customer.id, "<<<<<");
      res.status(200).json(favMovie);
      // console.log(favMovie , '<><><><><><');
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async handleFavorites(req, res, next) {
    try {
      const { movieId } = req.params;
      const customerId = req.customer.id;
      console.log(req.customer.id , '<<<<');
      const favMovie = await Favorite.create({
        movieId,
        customerId,
      });
      res.status(201).json({
        message: "Success add Favorites",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      //1. copas gugel buat tiket
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience:
          "1054147652656-c0q5svgpmjlbkhe32gs25piken3s2upo.apps.googleusercontent.com",
      });
      //2.buat ambil payload
      const payload = ticket.getPayload();
      // console.log(payload, "<<<<<<<<");
      //3. find or create data to db
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "34827",

        },
        hooks : false
      });
      //4. create token
      // console.log('hobipuasa' , '<<<<<<< di gugel login');
      const access_token = jwt.sign({ id : user.id , email : user.email}, 'hobipuasa');
      res.status(200).json({
        access_token
      })
    } catch (error) {
      console.log(error);
    next(error)
    }
  }
}

module.exports = CustomerController;
