// [GET] /
module.exports.index = (req, res) => {
    res.render("client/pages/home/index", {
        titlePage: "Trang chủ"
    })
}

module.exports.blog = (req, res) => {
    res.render("client/pages/home/blog", {
        titlePage: "Blog"
    })
}