// Importing required modules
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var routes = require('./routes/index')

// Creating express app
var app = express()
const portNo = 8000

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', 
        defaultLayout: 'main', 
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// other setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressValidator())

// Creating separate session for each page
app.use(expressSession({
        cookie: { maxAge: 10000, path: '/profile'},
        name: 'profile-session',
        secret: 'Shhhh', 
        saveUninitialized: false, 
        resave: false
}))
app.use(expressSession({
        cookie: { maxAge: 60000, path: '/register'},
        name: 'register-session',
        secret: 'shhhh', 
        saveUninitialized: false, 
        resave: false
}))
app.use(expressSession({
        cookie: { path: '/login', secure: false},
        name: 'login-session',
        secret: 'shhhh',
        saveUninitialized: false,
        resave: false
}))
// Setting router and static public paths
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)


// Setting server to listen on port
app.listen(portNo, (req, res) => {
    console.log('Server started running at port: ' + portNo)
})