module.exports.index = (req, res) => {
    res.render("client/pages/product/index", {
        titlePage: "Danh sach san pham"
    })
}

module.exports.create = (req, res) => {
    res.render("client/pages/product/create", {
        titlePage: "Tao san pham"
    })
}