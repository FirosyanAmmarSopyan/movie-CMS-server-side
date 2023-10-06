const { verify } = require("jsonwebtoken");
const {User} = require('../models/index')

async function authentication(req, res, next) {
  try {
    console.log("masuk authenti");
    // console.log(req.headers);
    //1. cek apakah verifi token
    let access_token = req.headers.access_token;

    //2. verify tokennya valid atau tidak
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    //3. pastikan bahwa data yg disimpan pada pyaload itu asli
    let payload = verify(access_token, process.env.SECRET_KEY_JWT);
    // console.log(payload);
    let user = await User.findByPk(payload.id)
    if (!user) {
        throw ({name : "Unauthenticated"})
    }else{
        req.user = user
        // console.log(user.role , `<<<<<<<<`);
    }
    next()
  } catch (error) {

    console.log(error);
    if (error.name === "Unauthenticated") {
      res.status(401).json({
        message: "Unauthenticated",
      });
    } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({
        message: "Unauthenticated",

        })
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = { authentication };
