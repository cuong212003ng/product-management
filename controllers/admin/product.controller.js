const Product = require("../../models/product.model")
// [GET] /admin/products
module.exports.product = async (req, res) => {
    const products = await Product.find({
        deleted: false
    });
    console.log(products);   

    res.render("admin/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: products
    })
}