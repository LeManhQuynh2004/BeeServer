const dressController = require('../controller/weddingDressController')

const router = require("express").Router();

router.get('/', function(req, res, next) {
    res.render('dress');
});

// Lấy tất cả người dùng
router.get('/data',dressController.getAllDress);

// Lấy một người dùng cụ thể
router.get('/data/:id',dressController.getAnDress);

// Thêm người dùng mới
router.post('/data',dressController.addDress);

// Xóa người dùng
router.delete('/data/:id',dressController.deleteDress);

// Cập nhật thông tin người dùng
router.put('/data/:id',dressController.updateDress);

module.exports = router;