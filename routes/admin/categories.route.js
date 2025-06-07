const express = require("express")
const route = express.Router()
const controller = require("../../controllers/admin/categories.controller")

route.get("/", controller.categories)

module.exports = route