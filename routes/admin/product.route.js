const express = require("express")
const route = express.Router()
const controller = require("../../controllers/admin/product.controller")

route.get("/", controller.product)
route.patch("/change-status/:status/:id", controller.changeStatus)
route.patch("/change-multi", controller.changeMulti)
route.delete("/delete/:id", controller.deleteItem)

route.get("/create", controller.createGET) // Render form to create a new product
route.post("/create", controller.createPOST) // Handle form submission to create a new product

module.exports = route