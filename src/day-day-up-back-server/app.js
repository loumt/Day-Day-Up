const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./lib/logger.lib')
const cors = require('cors')
const session = require('express-session')
const ErrorCode = require('./constants/ErrorCode');
const favicon = require('serve-favicon')
const ResJson = require('./middleware/ResJson')
const router = require('./lib/route-map.lib');
const compression = require('compression')
const sessionConfig = require('./config/session')


const app = express();
app.use(compression())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger.access());
app.use(favicon(path.join(__dirname, 'public', './images/icon.ico')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(ResJson())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig))

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
  logger.system().error(err);
  res.jsonOn404('Router Not Found!')
});

module.exports = app;
