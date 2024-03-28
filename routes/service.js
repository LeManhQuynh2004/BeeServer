const upload = require('../config/upload');
const serviceController = require('../controller/serviceController');
const { Service } = require('../model/model');

const router = require("express").Router();
//POST SERVICE
router.post("/", upload.array('image', 5), async (req, res) => {
    try {
        const data = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        const imageUrl = files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);

        const newUser = new Service({
            name: data.name,
            price: data.price,
            image: imageUrl,
            describe: data.describe,
            location: data.location,
            time: data.time,
            utilities: data.utilities,
            result: data.result
        });
        await newUser.save();// Lưu vào cơ sở dữ liệu
        res.status(200).redirect('http://localhost:3000/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
});
//GET SERVICE
router.get('/', serviceController.getAllService);

//GET PAGE SERVICE
router.get('/page', serviceController.getPageServer);

//GET AN SERVICE
router.get("/:id", serviceController.getAnService)

//UPDATE SERVICE
router.put("/:id", serviceController.updateService);

//DELETE SERVICE
router.delete("/:id", serviceController.deleteData)

module.exports = router; 