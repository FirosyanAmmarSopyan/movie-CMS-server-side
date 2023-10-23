const { Movie , User , Genre , History } = require("../models/index");

class MovieController {
  static async handlerCreate(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } =
        req.body;
      const movie = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId : req.user.id
      });

      await History.create({
        title : movie.title,
        description : `POST : new ${movie.title} with id ${movie.id} has been created`,
        updatedBy : req.user.username
      })

      res.status(201).json({ movie });
    } catch (error) {
      console.log(error);
     next(error)
    }
  }

  static async readAll(req, res, next) {
    try {
      const movie = await Movie.findAll({
        include : [User , Genre]
      });
      res.status(200).json(movie);
    } catch (error) {
     next(error)
    }
  }

  static async renderDetail(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id , {
        include : [Genre]
      });
      if (!movie) {
        throw {name : 'not found'}
      }
    //   console.log(id, movie.title);
      res.status(200).json(movie);
    } catch (error) {
      next(error)
    }
  }

  static async handlerDelete(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.destroy({ where: {id} })
      if (!movie) {
       throw {name : 'not found'}
      }
    //   console.log(id, movie);
      res.status(200).json({
        message : `movies success to delete`
      })
    } catch (error) {
        next(error)
      }
  }


  static async replaceEditMovie(req, res, next) {
    try {
      const { id } = req.params
      const {title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body
      // console.log(req.body , ',,,,');

      const findMovie = await Movie.findByPk(id);
      if (!findMovie) {
        throw { name: "not found" };
      }
      const updatedMovie = await Movie.update(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
        },
        { where: { id } }
      );
      console.log(updatedMovie);

      await History.create({
        title: title,
        description: `PUT: movie with id ${id} updated`,
        updatedBy: req.user.email,
      });
      console.log('sukses update');
      res.status(200).json({ message: `Movie with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  }
  static async modifyEditMovie(req , res , next){
    try {
      const {id} = req.params
      const { status } = req.body;

      const movie = await Movie.findByPk(id)
      if (!movie) {
          throw { name : 'not found'}
      }
      
      if (movie.status === status) {
        throw {name : 'cant edit with same status'}
      }
      const updatedStatusMovies = await Movie.update({ status } ,{
        where : {id}
      })

     await History.create({
        title : movie.title,
        description : `PATCH : ${movie.title} status with id ${id} has been updated from ${movie.status} to ${status}`,
        updatedBy : req.user.username
      })

      if (updatedStatusMovies[0] === 0) {
         throw {name : 'not found'}
      }

      res.status(200).json({message : 'succes updated status movie'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController;
