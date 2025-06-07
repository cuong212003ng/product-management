// [GET] /admin/settings
module.exports.settings = (req, res) => {
    res.render("admin/pages/settings/index", {
        titlePage: "Settings"
    })
}