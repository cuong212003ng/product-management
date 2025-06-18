const express = require("express")
const multer  = require('multer') //Multer là một middleware để xử lý upload file
const route = express.Router()
const storage = require('../../helpers/storage-multer') //Hàm storage để lưu file vào thư mục uploads
const upload = multer({ storage: storage() }) //Upload là một middleware để xử lý upload file

const controller = require("../../controllers/admin/product.controller")

const validate = require("../../validates/admin/product.validate")

route.get("/", controller.product)

route.patch("/change-status/:status/:id", controller.changeStatus)

route.patch("/change-multi", controller.changeMulti)

route.delete("/delete/:id", controller.deleteItem)

route.get("/create", controller.createGET) // Render form to create a new product
route.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPOST, // Validate the form data before processing
    controller.createPOST) // Handle form submission to create a new product

route.get("/edit/:id", controller.editGET) // Render form to update an existing product
route.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.editPATCH, // Validate the form data before processing
    controller.editPATCH) // Handle form submission to create a new product

module.exports = route