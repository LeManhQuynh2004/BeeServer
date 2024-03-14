var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const pass = 'ad7yXhV2BHZPlLTH';
// const mongodblink = "mongodb+srv://quynhlmdev:<password>@cluster0.51dj2cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
var userRouter = require('./routes/user')
var serviceRouter = require('./routes/service')
var dressRouter = require('./routes/dress')
var photoRouter = require('./routes/photo')

mongoose.connect('mongodb+srv://quynhlmph32353:qnkRTuU9PrE3L9iW@cluster0.e7sqtqm.mongodb.net/BeeStudio')
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Connection error:', error));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/service', serviceRouter);
app.use('/users', userRouter);
app.use('/dress', dressRouter);
app.use('/photos', photoRouter);
app.use('/', (req, res, next) => {
  res.status(200).render('index')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
