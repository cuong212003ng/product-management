// [GET] /admin/users
module.exports.users = (req, res) => {
    res.render("admin/pages/users/index", {
        titlePage: "Users"
    })
}