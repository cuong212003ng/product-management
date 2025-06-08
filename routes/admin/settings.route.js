const express = require("express")
const route = express.Router()
const controller = require("../../controllers/admin/settings.controller") 

route.get("/", controller.settings)

module.exports = route