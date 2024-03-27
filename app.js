var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const dotenv = require('dotenv')

var userRouter = require('./routes/user')
var serviceRouter = require('./routes/service')
var dressRouter = require('./routes/dress')
var photoRouter = require('./routes/photo')
var categoryRouter = require('./routes/category')
var newRouter = require('./routes/news');
var bookingRouter = require('./routes/booking');
let albumRouter = require('./routes/album');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Connection error:', error));

const app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTER
app.use('/news', newRouter);
app.use('/service', serviceRouter);
app.use('/users', userRouter);
app.use('/dress', dressRouter);
app.use('/photos', photoRouter);
app.use('/category', categoryRouter);
app.use('/booking', bookingRouter);
app.use('/album', albumRouter);

app.use("/uploads", express.static("uploads"));

app.use('/', (req, res, next) => {
  res.status(200).render('index');
});

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
