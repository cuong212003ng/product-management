const Product = require("../../models/product.model")
// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" }) // Sắp xếp theo vị trí giảm dần
    console.log(products);
    
    const newProducts = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
        return item
    })


    res.render("client/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: newProducts
    })
}

module.exports.create = (req, res) => {
    res.render("client/pages/product/create", {
        titlePage: "Create Product"
    })
}