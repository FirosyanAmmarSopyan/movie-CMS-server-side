const {History} = require('../models/index')
class HistoryController{

    static async renderHistory(req , res , next){
        try {
            const history = await History.findAll({
                order : [['id' , 'DESC']]
            })
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    }


}


module.exports = HistoryController