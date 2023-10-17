"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Favorite , {
        foreignKey : 'customerId'
      })
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email required",
          },
          notNull: {
            msg: "email required",
          },
          isEmail: {
            msg: "format must be Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password required",
          },
          notNull: {
            msg : 'password required'
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks : {
        beforeCreate : (user , options ) => {
          let salt = bcrypt.genSaltSync(10)
          let hashPw = bcrypt.hashSync(user.password , salt)
          user.password = hashPw
          user.role = 'client'
        }
    },
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
