const {Movie} = require('../models/index')

async function authorization( req , res ,next) {
  try {
    console.log('masuk authori');
    //1.ambil data user
    const {id} = req.params

    let user = req.user
    
    const movie = await Movie.findByPk(id)
    
    //2.cek movie ada di db atau tidak
    if (!movie) {
        throw { name : 'not found'}
    }
    console.log(movie , '<<<<<<< ini');
    // console.log(movie);

    //3. cek kuasa admin
    if (user.role === 'admin') {
        next()
    }else{
        if (movie.authorId == user.id) {
           next()
        }else{
            throw {name : 'Forbidden'}
        }
    }

    // console.log(user , '<<<< data user author');
  } catch (error) {
    console.log(error);
    if (error.name === 'Forbidden') {
        res.status(403).json({
            error : 'forbidden'
        })
    }else{
        res.status(500).json({
            error : 'Internal server Error'
        })
    }
  }
}

module.exports = { authorization };
