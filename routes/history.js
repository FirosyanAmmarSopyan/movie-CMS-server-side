const express = require('express')
const historyRoutes = express.Router()
const HistoryController = require('../controllers/history')

historyRoutes.get('/' , HistoryController.renderHistory )


module.exports  = historyRoutes
