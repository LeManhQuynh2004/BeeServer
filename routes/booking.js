const bookingController = require("../controller/bookingController");

const router = require("express").Router();

router.get('/', function(req, res, next) {
    res.render('booking');
});

// Lấy tất cả người dùng
router.get('/data',bookingController.getAllBooking);

// Lấy một người dùng cụ thể
router.get('/data/:id',bookingController.getAnBooking);

// Thêm người dùng mới
router.post('/data',bookingController.addBooking);

// Xóa người dùng
router.delete('/data/:id',bookingController.deleteBooking);

// Cập nhật thông tin người dùng
router.put('/data/:id',bookingController.updateBooking);

module.exports = router;