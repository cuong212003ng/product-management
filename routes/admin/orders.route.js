const express = require("express")
const route = express.Router()
const controller = require("../../controllers/admin/orders.controller")

route.get("/", controller.orders)

module.exports = route