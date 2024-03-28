const upload = require('../config/upload');
const dressController = require('../controller/weddingDressController');
const { Dress } = require('../model/model');

const router = require("express").Router();

router.get('/', function (req, res, next) {
    res.render('dress');
});

router.post("/data", upload.array('image', 5), async (req, res, next) => {
    try {
        const data = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }
        const imageUrl = files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        const newDress = new Dress({
            name: data.name,
            price: data.price,
            image: imageUrl,
            material: data.material,
            color: data.color,
            rental_price: data.rental_price,
            describe: data.describe,
            style: data.style,
            quantity: data.quantity
        })
        await newDress.save();
        res.status(200).redirect('http://localhost:3000/dress');
    } catch (error) {
        res.status(500).json(error)
        res.status(500).json({ message: "Internal server error." });
    }
});

// Lấy tất cả người dùng
router.get('/data', dressController.getAllDress);

router.get('/data/page',dressController.getPageDress);

// Lấy một người dùng cụ thể
router.get('/data/:id', dressController.getAnDress);

// Thêm người dùng mới

// Xóa người dùng
router.delete('/data/:id', dressController.deleteDress);

// Cập nhật thông tin người dùng
router.put('/data/:id', dressController.updateDress);

module.exports = router;