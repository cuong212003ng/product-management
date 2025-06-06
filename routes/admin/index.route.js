const system = require("../../config/system")
const { prefixAdmin } = require("../../config/system")
const adminRoute = require("./dashboard.route")
const productRoute = require("./product.route")
module.exports = (app) => {
    const PATH_ADMIN = system.prefixAdmin
    app.use(PATH_ADMIN + "/dashboard", adminRoute)
    app.use(PATH_ADMIN + "/products", productRoute)
}