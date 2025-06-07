const express = require("express")
const route = express.Router()
const controller = require("../../controllers/admin/users.controller")

route.get("/", controller.users)

module.exports = route      