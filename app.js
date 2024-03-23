var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
var fs = require('fs');

// const pass = 'ad7yXhV2BHZPlLTH';
// const mongodblink = "mongodb+srv://quynhlmdev:<password>@cluster0.51dj2cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
var userRouter = require('./routes/user')
var serviceRouter = require('./routes/service')
var dressRouter = require('./routes/dress')
var photoRouter = require('./routes/photo')
var categoryRouter = require('./routes/category')
var newRouter = require('./routes/news');
var bookingRouter = require('./routes/booking');
const { User } = require('./model/model');

mongoose.connect('mongodb+srv://quynhlmph32353:qnkRTuU9PrE3L9iW@cluster0.e7sqtqm.mongodb.net/BeeStudio')
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Connection error:', error));

const app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    var dir = './public/uploads';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {

    let fileName = file.originalname;
    arr = fileName.split('.');

    let newFileName = '';

    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        newFileName += arr[i];
      } else {
        newFileName += ('-' + Date.now() + '.' + arr[i]);
      }
    }

    cb(null, newFileName)
  }
})

var upload = multer({ storage: storage })

app.post("/uploadfile", upload.single("avatar"), async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    const newUser = new User({
      username: data.username,
      password: data.password,
      avatar: imageUrl,
      email : data.email,
      role: 1,
    });
    await newUser.save();
    res.status(200).json("POST SUCCESSFULLY");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/service', serviceRouter);
app.use('/users', userRouter);
app.use('/dress', dressRouter);
app.use('/photos', photoRouter);
app.use('/category', categoryRouter);
app.use('/news', newRouter);
app.use('/booking', bookingRouter);

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
