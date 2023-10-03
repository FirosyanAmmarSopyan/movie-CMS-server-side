'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie , {
       foreignKey : 'authorId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'synopsis required'
        },
        notNull : {
          msg : 'synopsis required'
        },
        isEmail : {
          msg : 'format must be Email'
        }
      }
    },
    password: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'synopsis required'
        },
        notNull : {
          msg : 'synopsis required'
        },
        len : {
          args : [5],
          msg : 'password at least 5 character'
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};