const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../config/upload');
const { User } = require('../model/model');

// Đường dẫn cho các tác vụ CRUD của người dùng
router.get('/', function (req, res, next) {
    res.render('user');
});

router.post("/uploadfile", upload.single("avatar"), async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        const newUser = new User({
            username: data.username,
            password: data.password,
            avatar: imageUrl,
            email: data.email,
            role: 1,
        });
        await newUser.save();
        res.status(200).json("POST SUCCESSFULLY");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lấy tất cả người dùng
router.get('/data', userController.getAllUser);

// Lấy một người dùng cụ thể
router.get('/data/:id', userController.getAnUser);

// Xóa người dùng
router.delete('/data/:id', userController.deleteUser);

// Cập nhật thông tin người dùng
router.put('/data/:id', userController.updateUser);

module.exports = router;
