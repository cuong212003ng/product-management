const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const clientRoute = require("./routes/client/index.route")
const adminRoute = require("./routes/admin/index.route")

const database = require('./config/database')

const systemConfig = require('./config/system')

database.connect()

const port = process.env.PORT

app.use(methodOverride('_method'))                 //Dung de su dung method override
                                                
app.set('view engine', 'pug')                      //Dung de su dung pug
app.set('views', './views')
app.use(express.static('public'))                  //Dung de su dung file static   

app.use(bodyParser.json())                         //Dung de doc du lieu tu form req.body
app.use(bodyParser.urlencoded({ extended: false }))

app.locals.prefixAdmin = systemConfig.prefixAdmin  // Tao ra 1 bien toan cuc

clientRoute(app)
adminRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})