const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
// console.log(User);

class UserController {
  static async handlerRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
    next(error)
    }
  }

  static async handlerLogin(req, res, next) {
    try {
      //1. ambil data dari req body
      const { email, password } = req.body;

      //2.check apakah email ada di database
      const user = await User.findOne({ where: { email } });
      //3.validasi apakah email ini ada

      if (!user) {
        throw {name :"error invalid email or password" }
      } else {
        //4. kalau ada langsung compare password apakah valid
        let validPw = bcrypt.compareSync(password, user.password);
        //5.jika valid buatkan response payload dan buatkan access token
        if (validPw) {
          const payload = {
            id: user.id,
            email: user.email,
          };

          //6.pembuatan access token
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
      console.log(payload, "<<<<<<<<");
      //3. find or create data to db
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "34827",
          role: "staff",
          address: payload.locale,
        },
      });
      //4. create token
      const access_token = jwt.sign({ id : user.id , email : user.email}, process.env.SECRET_KEY_JWT);
      res.status(200).json({
        access_token
      })
    } catch (error) {
      console.log(error);
    next(error)
    }
  }
}

module.exports = UserController;
