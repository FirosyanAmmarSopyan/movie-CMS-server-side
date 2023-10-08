const { Genre , User } = require("../models/index")

class GenreController {
    static async renderGenre(req , res , next) {
        try {
            // console.log(User , 'ini USER');
            const genre = await Genre.findAll()
            res.status(200).json(genre)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenreController