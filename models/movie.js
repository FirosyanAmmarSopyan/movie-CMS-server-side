'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre , {
        foreignKey : 'genreId'
      })
      Movie.belongsTo(models.User , {
        foreignKey : 'authorId'
      })
    }
  }
  Movie.init({
    title: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'title required'
        },
        notNull : {
          msg : 'title required'
        }
      }
    },
    synopsis:{
      type :  DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'synopsis required'
        },
        notNull : {
          msg : 'synopsis required'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'rating required'
        },
        notNull : {
          msg : 'rating required'
        },
        min : {
          args : 1,
          msg : 'rating minim 1'
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};