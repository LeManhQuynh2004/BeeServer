const multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    var dir = './uploads';

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

const upload = multer({ storage: storage })

module.exports = upload