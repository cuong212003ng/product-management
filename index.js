const express = require('express')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config()

const clientRoute = require("./routes/client/index.route")
const adminRoute = require("./routes/admin/index.route")

const database = require('./config/database')

const systemConfig = require('./config/system')

database.connect()

const port = process.env.PORT

app.use(methodOverride('_method'))

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

app.locals.prefixAdmin = systemConfig.prefixAdmin  // Tao ra 1 bien toan cuc

clientRoute(app)
adminRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})