const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Đường dẫn cho các tác vụ CRUD của người dùng
router.get('/', function(req, res, next) {
    res.render('user');
});

// Lấy tất cả người dùng
router.get('/data', userController.getAllUser);

// Lấy một người dùng cụ thể
router.get('/data/:id', userController.getAnUser);

// Thêm người dùng mới
router.post('/data', userController.addUser);

// Xóa người dùng
router.delete('/data/:id', userController.deleteUser);

// Cập nhật thông tin người dùng
router.put('/data/:id', userController.updateUser);

module.exports = router;
