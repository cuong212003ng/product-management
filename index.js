const express = require('express')
const app = express()
require('dotenv').config()

const clientRoute = require("./routes/client/index.route")
const adminRoute = require("./routes/admin/index.route")

const database = require('./config/database')

database.connect()

const port = process.env.PORT

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

clientRoute(app)
adminRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})