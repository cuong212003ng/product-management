const Product = require("../../models/product.model")
module.exports.index = async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    
    res.render("client/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: products
    })
}

module.exports.create = (req, res) => {
    res.render("client/pages/product/create", {
        titlePage: "Create Product"
    })
}