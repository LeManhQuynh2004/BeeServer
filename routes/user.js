const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../config/upload');
const { User } = require('../model/model');
const e = require('express');

// Đường dẫn cho các tác vụ CRUD của người dùng
router.get('/', function (req, res, next) {
    res.render('user');
});

router.post("/uploadfile", upload.single("avatar"), async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        if (file != null) {
            const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
            const newUser = new User({
                username: data.username,
                password: data.password,
                avatar: imageUrl,
                email: data.email,
                role: 1,
            });
            await newUser.save();
            res.status(200).json(newUser);
        } else {
            const newUser = new User({
                username: data.username,
                password: data.password,
                email: data.email,
                role: 1,
                avatar : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put("/uploadfile", upload.single("avatar"), async (req, res) => {
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

// Lấy người dùng page
router.get('/data/page', userController.getUserPage);

// Lấy một người dùng cụ thể
router.get('/data/:id', userController.getAnUser);

// Xóa người dùng
router.delete('/data/:id', userController.deleteUser);

// Cập nhật thông tin người dùng
router.put('/data/:id', userController.updateUser);

module.exports = router;
