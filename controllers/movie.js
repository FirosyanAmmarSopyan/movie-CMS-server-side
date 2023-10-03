const { Movie } = require("../models/index");

class MovieController {
  static async handlerCreate(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId } =
        req.body;
      const movie = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId,
      });
      res.status(201).json({ movie });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors[0].message;
        res.status(400).json({ error: errors });
      } else {
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  }

  static async readAll(req, res, next) {
    try {
      const movie = await Movie.findAll();
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Errors",
      });
    }
  }

  static async renderDetail(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) {
        res.status(404).json({
          error: "not found",
        });
      }
    //   console.log(id, movie.title);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Errors",
      });
    }
  }

  static async handlerDelete(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.destroy({ where: {id} })
      if (!movie) {
        res.status(404).json({
          error: "not found"
        });
      }
    //   console.log(id, movie);
      res.status(200).json({
        message : `movies success to delete`
      })
    } catch (error) {
        res.status(500).json({
          error: "Internal Server Errors",
        });
      }
  }
}

module.exports = MovieController;
