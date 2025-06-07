// [GET] /admin/orders
module.exports.orders = (req, res) => {
    res.render("admin/pages/orders/index", {
        titlePage: "Orders"
    })
}