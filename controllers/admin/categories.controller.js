// [GET] /admin/categories
module.exports.categories = (req, res) => {
    res.render("admin/pages/categories/index", {
        titlePage: "Categories"
    })
}