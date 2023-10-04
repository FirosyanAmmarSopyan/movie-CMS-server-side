const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// console.log(User);

class UserController {
  static async handlerRegister(req, res, next) {
    try {
      const { username , email, password , phoneNumber ,address } = req.body;
      const user = await User.create({ username , email, password , phoneNumber ,address });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "errors",
      });
    }
  }

  static async handlerLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({
          error: "error invalid username or email or password",
        });
      } else {
        let validPw = bcrypt.compareSync(password, user.password);
        if (validPw) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          const access_token = jwt.sign(payload, "hobipuasa");
          res.status(200).json({
            access_token,
          });
        } else{
            res.status(401).json({
                error: "error invalid username or email or password",
              });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;
