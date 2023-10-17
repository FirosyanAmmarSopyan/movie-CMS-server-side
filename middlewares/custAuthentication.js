const jwt = require("jsonwebtoken");
const {Customer} = require('../models/index')

async function custAuthentication(req, res, next) {
  try {
    console.log("masuk authenti customer");
    // console.log(req.headers);
    //1. cek apakah verifi token
    let access_token = req.headers.access_token;

    //2. verify tokennya valid atau tidak
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    // console.log(access_token , '<<<<<<<<<<<');
    //3. pastikan bahwa data yg disimpan pada pyaload itu asli
    // console.log(process.env.SECRET_KEY_JWT , '<<<<<<<');
    let payload = jwt.verify(access_token, process.env.SECRET_KEY_JWT);
    let customer = await Customer.findByPk(payload.id)
    if (!customer) {
        throw ({name : "Unauthenticated"})
    }else{
        req.customer = customer
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

module.exports = { custAuthentication };
