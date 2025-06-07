const system = require("../../config/system")
const { prefixAdmin } = require("../../config/system")
const adminRoute = require("./dashboard.route")
const productRoute = require("./product.route")
const categoriesRoute = require("./categories.route")
const usersRoute = require("./users.route")
const ordersRoute = require("./orders.route")
const settingsRoute = require("./settings.route")

module.exports = (app) => {
    const PATH_ADMIN = system.prefixAdmin
    app.use(PATH_ADMIN + "/dashboard", adminRoute)
    app.use(PATH_ADMIN + "/products", productRoute)
    app.use(PATH_ADMIN + "/categories", categoriesRoute)
    app.use(PATH_ADMIN + "/users", usersRoute)
    app.use(PATH_ADMIN + "/orders", ordersRoute)
    app.use(PATH_ADMIN + "/settings", settingsRoute)
}