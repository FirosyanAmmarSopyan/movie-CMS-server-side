const {Customer , Genre , Movie} = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class CustomerController{
static async handlerLoginClient(req , res ,next){
      try {
        const {email , password} = req.body

      const user = await Customer.findOne({ where: { email } });

      if (!user) {
        throw {name :"error invalid email or password" }
      } else {
        let validPw = bcrypt.compareSync(password, user.password);
        if (validPw) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          console.log( payload , '<<<<<<');

          const access_token = jwt.sign(payload, process.env.SECRET_KEY_JWT);

          res.status(200).json({
            access_token,
          });
        } else {
          throw {name :"error invalid username or email or password" }
        }
      }
      } catch (error) {
        next(error)
      }
    }
    static async handlerRegisterClient(req , res ,next ){
      try {
        const { email , password } = req.body;
        const user = await Customer.create({
          email,
          password
        });
        res.status(201).json({
          id: user.id,
          email: user.email,
          role : user.role
        });
      } catch (error) {
        next(error)
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
          console.log(process.env.SECRET_KEY_JWT , '<<<<<<< di gugel login');
          const access_token = jwt.sign({ id : user.id , email : user.email}, process.env.SECRET_KEY_JWT);
          res.status(200).json({
            access_token
          })
        } catch (error) {
          console.log(error);
        next(error)
        }
      }
      static async renderGenre(req , res , next) {
        try {
            const genre = await Genre.findAll()
            res.status(200).json(genre)
        } catch (error) {
            next(error)
        }
    }
    static async readAllMovies(req, res, next) {
        try {
          const movie = await Movie.findAll(
        //     {
        //     // include : [User , Genre]
        //   }
          );
          res.status(200).json(movie);
        } catch (error) {
         next(error)
        }
      }
}

module.exports = CustomerController