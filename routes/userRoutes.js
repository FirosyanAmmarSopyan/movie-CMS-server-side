const express = require('express')
const userRoutes = express()
const UserController  = require('../controllers/user')


userRoutes.get('/')