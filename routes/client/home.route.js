const express = require('express')
const route = express.Router()
const controller = require("../../controllers/client/home.controller")

route.get('/', controller.index)
route.get('/blog', controller.blog)

module.exports = route