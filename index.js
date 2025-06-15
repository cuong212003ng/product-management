const express = require('express')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const app = express()
// Khai bao dotenv de su dung bien moi truong
require('dotenv').config()

// Khai bao cac route
const clientRoute = require("./routes/client/index.route")
const adminRoute = require("./routes/admin/index.route")

// Khai bao config database
const database = require('./config/database')

// Ket noi toi database
database.connect()

// Khai bao cac config
const systemConfig = require('./config/system')

const port = process.env.PORT
//Dung de su dung method override
app.use(methodOverride('_method'))

//Dung de su dung pug                                
app.set('view engine', 'pug') 
app.set('views', './views')

//Dung de doc du lieu tu form req.body
app.use(bodyParser.json())                         
app.use(bodyParser.urlencoded({ extended: false }))
  
//Dung de su dung flash
//Khai bao secret key cho cookie parser
app.use(cookieParser('keyboard cat'));
//Khai bao session
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Tao ra 1 bien toan cuc
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Dung de public cac file static 
app.use(express.static('public')) 

//Routes
clientRoute(app)
adminRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})