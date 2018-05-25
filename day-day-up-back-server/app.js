const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const session = require('express-session')
const ErrorCode = require('./constants/ErrorCode');
const ResJson = require('./middleware/ResJson')

const appRouter = require('./routes/app');
const userRouter = require('./routes/user');
const roleRouter = require('./routes/role');
const apiRouter = require('./routes/api');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(ResJson)
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'up-up-day',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use('/', appRouter);
app.use('/api', apiRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.log(err);
    console.log(ErrorCode.SYSTEM_ERROR);
    res.status(500).json({success: false, message: 'Error With Router End!!'});
});

module.exports = app;
