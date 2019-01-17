const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const ErrorCode = require('./constants/ErrorCode');
const favicon = require('serve-favicon')
const ResJson = require('./middleware/ResJson')
const router = require('./lib/route-map.lib');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
// app.use(favicon(path.join(__dirname, 'public', './images/icon.png')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(ResJson)
app.use(express.static(path.join(__dirname, 'public')));

//提供给客户端做版本更新
app.use('/versions',express.static(path.join(__dirname, 'versions')));

app.use(session({
    secret: 'up-up-day',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     res.header('X-Powered-By', ' 3.2.1')
//     if (req.method === 'OPTIONS') res.send(200)
//     else next()
// })
// app.use(cors())
app.use(router)

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.log(err.code);
    console.log(ErrorCode.SYSTEM_ERROR);
    res.status(500).json({success: false, message: 'Error With Router End!!'});
});

module.exports = app;
