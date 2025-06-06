// [GET] /admin/products
module.exports.product = (req, res) => {
    res.render("admin/pages/product/index", {
        titlePage: "Dashboard"
    })
}